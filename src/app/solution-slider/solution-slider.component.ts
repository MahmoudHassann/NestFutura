import {
  Component,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  OnDestroy,
  signal,
  HostListener,
  ViewEncapsulation,
  ViewChild,
  Renderer2
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLightbulb,
  faToggleOn,
  faDoorOpen,
  faTemperatureHalf,
  faLock,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';


interface Card {
  icon: any;
  title: string;
  description: string;
  isHovered: boolean;
  backgroundImage: string;
}

interface CardState {
  height: number;
  isActive: boolean;
  isMinimized: boolean;
}

@Component({
  selector: 'app-solution-slider',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterLink],
  templateUrl: './solution-slider.component.html',
  styleUrl: './solution-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class SolutionSliderComponent {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  private readonly isBrowser: boolean;
  private cardStates = signal<CardState[]>([]);
  private observer: IntersectionObserver | null = null;
  private scrollListenerUnsubscribe: (() => void) | null = null;
  private lastScrollPosition = 0;
  private scrollDirection: 'up' | 'down' = 'down';

  private containerHeight = 0;
  private cardBaseHeight = 0;
  isMobileView = false;
  defaultDesktopHeight = 600;
  private readonly EXPANDED_HEIGHT = 500;
  private readonly MINIMIZED_HEIGHT = 60;
  private readonly ACTIVATION_OFFSET = 300; // Distance from top to trigger expansion
  private readonly DEACTIVATION_OFFSET = 100; // Distance from top to trigger minimization
  private ticking = false;
  private containerTop = 0;
  private viewportHeight = 0;


  readonly cards: Card[] = [
    {
      icon: faLightbulb,
      title: 'Smart Lighting',
      description: 'Control your home lighting system',
      isHovered: false,
      backgroundImage: 'https://www.shelly.com/cdn/shop/files/use-cases-homepage-smart-lighting_1920x.jpg?v=1728642600'
    },
    {
      icon: faToggleOn,
      title: 'Smart Switches',
      description: 'Automated power control',
      isHovered: false,
      backgroundImage: 'https://www.shelly.com/cdn/shop/files/use-cases-homepage-appliances_1920x.jpg?v=1728642498'
    },
    {
      icon: faDoorOpen,
      title: 'Smart Doors',
      description: 'Automate your doors, garage, and gates for easy control',
      isHovered: false,
      backgroundImage: 'https://www.shelly.com/cdn/shop/files/use-cases-homepage-garage-door_1920x.jpg?v=1728642600'
    },
    {
      icon: faWarehouse,
      title: 'Smart covers & blinds',
      description: 'Automate your curtains, blinds, roller shutters, and awnings for comfort and energy savings',
      isHovered: false,
      backgroundImage: 'https://www.shelly.com/cdn/shop/files/use-cases-homepage-smart-blinds_1920x.jpg?v=1728642657'
    },
    {
      icon: faTemperatureHalf,
      title: 'Temperature',
      description: 'Smart temperature control',
      isHovered: false,
      backgroundImage: 'https://www.shelly.com/cdn/shop/files/use-cases-homepage-h_t_1920x.jpg?v=1728642599'
    },
    {
      icon: faLock,
      title: 'Security',
      description: 'Enhanced home security',
      isHovered: false,
      backgroundImage: 'https://www.shelly.com/cdn/shop/files/use-cases-homepage-security_1920x.jpg?v=1728642599'
    }
  ];

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initializeComponent();
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private cleanup(): void {
    if (this.scrollListenerUnsubscribe) {
      this.scrollListenerUnsubscribe();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initializeComponent(): void {
    this.updateContainerDimensions();
    this.initializeCardStates();
    this.setupIntersectionObserver();
  }

  private updateContainerDimensions(): void {
    if (!this.cardsContainer) return;

    const container = this.cardsContainer.nativeElement;
    const containerRect = container.getBoundingClientRect();
    this.containerHeight = containerRect.height;
    this.containerTop = window.pageYOffset + containerRect.top;
    this.viewportHeight = window.innerHeight;
    this.cardBaseHeight = this.isMobileView ? this.EXPANDED_HEIGHT : this.defaultDesktopHeight;
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setupScrollListener();
            this.updateCardStatesOnScroll();
          }
        });
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );

    const container = this.elementRef.nativeElement.querySelector('.cards-container');
    if (container) {
      this.observer.observe(container);
    }
  }

  private setupScrollListener(): void {
    this.ngZone.runOutsideAngular(() => {
      const scrollHandler = () => {
        if (!this.ticking) {
          requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            this.scrollDirection = currentScroll > this.lastScrollPosition ? 'down' : 'up';
            this.lastScrollPosition = currentScroll;
            this.updateCardStatesOnScroll();
            this.ticking = false;
          });
          this.ticking = true;
        }
      };

      window.addEventListener('scroll', scrollHandler, { passive: true });
      this.scrollListenerUnsubscribe = () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    });
  }

  private updateCardStatesOnScroll(): void {
    if (!this.isMobileView) return;

    const scrollTop = window.pageYOffset;
    const containerRect = this.cardsContainer.nativeElement.getBoundingClientRect();
    
    const newStates = this.cards.map((_, index) => {
      // Check if this is the last card
      const isLastCard = index === this.cards.length - 1;
      
      // If it's the last card, always return expanded state
      if (isLastCard) {
        return {
          height: this.EXPANDED_HEIGHT,
          isActive: true,
          isMinimized: false
        };
      }

      const cardTop = containerRect.top + (index * this.EXPANDED_HEIGHT);
      const cardPosition = cardTop - this.DEACTIVATION_OFFSET;
      
      let isActive = false;
      let isMinimized = false;
      let height = this.EXPANDED_HEIGHT;

      if (cardPosition < 0) {
        // Card is above viewport
        if (Math.abs(cardPosition) > this.ACTIVATION_OFFSET) {
          isMinimized = true;
          height = this.MINIMIZED_HEIGHT;
        } else {
          isActive = true;
          // Smooth transition between expanded and minimized
          const progress = Math.abs(cardPosition) / this.ACTIVATION_OFFSET;
          height = this.EXPANDED_HEIGHT - (progress * (this.EXPANDED_HEIGHT - this.MINIMIZED_HEIGHT));
        }
      }

      // Apply different behavior based on scroll direction
      if (this.scrollDirection === 'up' && isMinimized) {
        const distanceFromTop = Math.abs(cardPosition);
        if (distanceFromTop < this.ACTIVATION_OFFSET * 1.5) {
          isMinimized = false;
          isActive = true;
          const progress = distanceFromTop / (this.ACTIVATION_OFFSET * 1.5);
          height = this.MINIMIZED_HEIGHT + ((1 - progress) * (this.EXPANDED_HEIGHT - this.MINIMIZED_HEIGHT));
        }
      }

      return {
        height: Math.max(this.MINIMIZED_HEIGHT, Math.min(this.EXPANDED_HEIGHT, height)),
        isActive,
        isMinimized
      };
    });

    this.ngZone.run(() => {
      this.cardStates.set(newStates);
      this.cdr.detectChanges();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkScreenSize();
      this.updateContainerDimensions();
      this.updateCardStatesOnScroll();
    }
  }

  private checkScreenSize(): void {
    const wasMobile = this.isMobileView;
    this.isMobileView = window.innerWidth <= 989;
    
    if (wasMobile !== this.isMobileView) {
      this.initializeCardStates();
      this.updateContainerDimensions();
    }
  }

  private initializeCardStates(): void {
    if (this.cards.length > 0) {
      const lastCard = this.cards[this.cards.length - 1];
      lastCard.isHovered = true; // Update the isHovered property
      this.cdr.detectChanges(); // Trigger change detection to reflect the change in the view
    }
    const initialStates: CardState[] = this.cards.map(() => ({
      height: this.isMobileView ? this.EXPANDED_HEIGHT : this.defaultDesktopHeight,
      isActive: false,
      isMinimized: false
    }));
    this.cardStates.set(initialStates);
  }

  onCardHover(card: Card): void {
    if (!this.isMobileView) {
      this.cards.forEach(c => c.isHovered = c === card);
      this.cdr.detectChanges();
    }
  }

  getCardState(index: number): CardState {
    return this.cardStates()[index] || {
      height: this.isMobileView ? this.EXPANDED_HEIGHT : this.defaultDesktopHeight,
      isActive: false,
      isMinimized: false
    };
  }

}
