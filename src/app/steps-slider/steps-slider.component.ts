import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { NgZone } from '@angular/core';
import { Swiper } from 'swiper';


interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

@Component({
  selector: 'app-steps-slider',
  standalone:true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './steps-slider.component.html',
  styleUrl: './steps-slider.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StepsSliderComponent {

  private platformId = inject(PLATFORM_ID);
  private scrollListener: (() => void) | null = null; // Reference to the scroll listener
  private renderer = inject(Renderer2); // Inject Renderer2 for DOM manipulation

  constructor(private ngZone: NgZone, private elementRef: ElementRef) { }

  @ViewChildren('stepRef') stepRefs!: QueryList<ElementRef>;
  @ViewChild('swiperRef') swiperRef!: ElementRef;


  shoppingBagIcon = faShoppingBag;
  currentStep = 0;
  lineProgresses: number[] = [0, 0];

  steps = [
    {
      title: 'Get Your Shelly Device',
      description: 'Shelly offers a wide range of smart devices to suit your specific automation needs - whether you want to control lighting, heating, or appliances.',
      image: 'https://www.shelly.com/cdn/shop/files/homepage-section-get-started-step1_1428x.jpg?v=1728643644',
      buttonText: 'Shop now',
      buttonLink: '#',
    },
    {
      title: 'Install your Shelly device',
      description: 'Easily install your Shelly device yourself using our knowledge base, wiring videos, and step-by-step guides.',
      image: 'https://www.shelly.com/cdn/shop/files/homepage-section-get-started-step2_1428x.jpg?v=1728644779',
      buttonText: 'See Knowledge Base',
      buttonLink: '#',
    },
    {
      title: 'Enjoy your new smart home',
      description: 'Control your home devices from anywhere using the Shelly app or integrate them with your favorite smart home platform.',
      image: 'https://www.shelly.com/cdn/shop/files/homepage-section-get-started-step3_1428x.jpg?v=1728643644',
      buttonText: 'Learn More',
      buttonLink: '#',
    },
  ];

  swiperInstance: Swiper | undefined;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Use Renderer2 to listen to the scroll event
      this.ngZone.runOutsideAngular(() => {
        this.scrollListener = this.renderer.listen('window', 'scroll', () => this.checkScroll());
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
      const swiperEl = this.swiperRef.nativeElement;
      Object.assign(swiperEl, {
        slidesPerView: 1.1,
        on: {
          init(){

          },
          slideChange: () => {
            if (this.swiperInstance) {
              this.currentStep = this.swiperInstance.activeIndex;
            }
          }
        }
      });
      swiperEl.initialize();
    }
  }

  ngOnDestroy() {
    // Remove the scroll listener when the component is destroyed
    if (this.scrollListener) {
      this.scrollListener();
    }
  }


  goToSlide(stepIndex: number) {
    this.swiperInstance?.slideTo(stepIndex);
    this.currentStep = stepIndex;
  }

  private checkScroll() {
    if (!this.stepRefs) return;

    this.ngZone.run(() => {
      const viewportHeight = this.elementRef.nativeElement.ownerDocument.defaultView.innerHeight;
      const scrollY = this.elementRef.nativeElement.ownerDocument.defaultView.scrollY;
      const triggerPoint = scrollY + viewportHeight * 0.5;

      this.stepRefs.forEach((stepRef, index) => {
        const element = stepRef.nativeElement;
        const { top, height } = element.getBoundingClientRect();
        const absoluteTop = top + scrollY;

        // Calculate progress
        const elementProgress = (triggerPoint - absoluteTop) / height;

        if (elementProgress >= 0 && elementProgress <= 1) {
          this.currentStep = index;
          requestAnimationFrame(() => {
            this.lineProgresses[index] = Math.max(0, Math.min(100, elementProgress * 100));
          });
        }
      });
    });
  }

  getLineProgress(index: number): number {
    if (this.currentStep > index) return 100;
    if (this.currentStep < index) return 0;
    return this.lineProgresses[index] || 0;
  }

  getImageOpacity(index: number): number {
    return index === this.currentStep ? 1 : 0;
  }

  getImageTransform(index: number): string {
    const scale = index === this.currentStep ? 1 : 0.8;
    return `scale(${scale})`;
  }
}
