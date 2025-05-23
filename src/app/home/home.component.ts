import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductSliderComponent } from '../product-slider/product-slider.component';
import { SolutionSliderComponent } from '../solution-slider/solution-slider.component';
import { StepsSliderComponent } from '../steps-slider/steps-slider.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../interface/project';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductSliderComponent,
    SolutionSliderComponent,
    StepsSliderComponent,
    ProjectCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent implements OnInit, AfterViewInit {
  isPopupVisible = false;
  project: Project[] = [];
  projects: Project[] = [];
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  metrics = [
    { value: 3000000, caption: 'Households', type: 'million' },
    { value: 18000000, caption: 'Households', type: 'million' },
    { value: 100, caption: 'Households', type: 'number' },
    { value: 40, caption: 'Percentage', type: 'percentage' },
  ];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.project = [
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
    ];
    this.projects = [...this.project];
    /* if (isPlatformBrowser(this.platformId)) {
      const metricsSection = this.el.nativeElement.querySelector('.metrics');
      const metricElements =
        this.el.nativeElement.querySelectorAll('.metric-value');

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                metricElements.forEach((el: HTMLElement) => {
                  const endValue = parseInt(el.getAttribute('data-value')!, 10);
                  const type = el.getAttribute('data-type')!;
                  this.animateNumbers(el, 0, endValue, 2000, type);
                });
                observer.unobserve(metricsSection); // Stop observing after animation starts
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(metricsSection);
      } else {
        // Fallback: Directly animate if IntersectionObserver is unavailable
        metricElements.forEach((el: HTMLElement) => {
          const endValue = parseInt(el.getAttribute('data-value')!, 10);
          const type = el.getAttribute('data-type')!;
          this.animateNumbers(el, 0, endValue, 2000, type);
        });
      }
    } */
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      const swiperEl = this.swiperRef.nativeElement;
      Object.assign(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 12,
        loop: false,
        breakpoints: {
          989: {
            spaceBetween: 22,
          },
        },
        observer: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init() {},
        },
      });
      swiperEl.initialize();
    }
  }

  private setupIntersectionObserver(): void {
    const metricsSection = this.el.nativeElement.querySelector('.metrics');
    const metricElements =
      this.el.nativeElement.querySelectorAll('.metric-value');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              metricElements.forEach((el: HTMLElement) => {
                const endValue = parseInt(el.getAttribute('data-value')!, 10);
                const type = el.getAttribute('data-type')!;
                this.animateNumbers(el, 0, endValue, 2000, type);
              });
              observer.unobserve(metricsSection); // Stop observing after animation starts
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(metricsSection);
    } else {
      // Fallback: Directly animate if IntersectionObserver is unavailable
      metricElements.forEach((el: HTMLElement) => {
        const endValue = parseInt(el.getAttribute('data-value')!, 10);
        const type = el.getAttribute('data-type')!;
        this.animateNumbers(el, 0, endValue, 2000, type);
      });
    }
  }

  private animateNumbers(
    el: HTMLElement,
    start: number,
    end: number,
    duration: number,
    type: string
  ): void {
    const range = end - start;
    let current = start;
    const stepTime = Math.max(Math.floor(duration / range), 10); // Ensure a minimum step interval

    const formatNumber = (value: number): string => {
      switch (type) {
        case 'million':
          return value >= 1_000_000
            ? `${Math.floor(value / 1_000_000)}+ M`
            : value.toString();
        case 'percentage':
          return `${value}%`;
        default:
          return `${value.toString()}+`;
      }
    };

    const timer = setInterval(() => {
      if (current < end) {
        const increment = Math.ceil(range / (duration / stepTime));
        current += increment;

        if (current > end) {
          current = end; // Cap at the final value
        }
      }

      this.renderer.setProperty(el, 'textContent', formatNumber(current));

      if (current >= end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  showVideoPopup(video: HTMLVideoElement): void {
    this.isPopupVisible = true;
    video.play();
  }

  hideVideoPopup(video: HTMLVideoElement): void {
    this.isPopupVisible = false;
    video.pause();
  }
}
