import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isPopupVisible = false;
  metrics = [
    { value: 3000000, caption: 'Households', type: 'million' },
    { value: 18000000, caption: 'Households', type: 'million' },
    { value: 100, caption: 'Households', type: 'number' },
    { value: 40, caption: 'Percentage', type: 'percentage' },
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const metricsSection = this.el.nativeElement.querySelector('.metrics');
      const metricElements = this.el.nativeElement.querySelectorAll('.metric-value');

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
  }

  animateNumbers(el: HTMLElement, start: number, end: number, duration: number, type: string): void {
    const range = end - start;
    let current = start;
    const stepTime = Math.max(Math.floor(duration / range), 10); // Ensure a minimum step interval
  
    const formatNumber = (value: number): string => {
      switch (type) {
        case 'million':
          if (value >= 1_000_000) {
            return `${Math.floor(value / 1_000_000)} + M`; // Only divide when value reaches a million
          }
          return value.toString();
        case 'percentage':
          return `${value}%`;
        default:
          return `${value.toString()} +`;
      }
    };
  
    const timer = setInterval(() => {
      if (current < end) {
        const increment = Math.ceil(range / (duration / stepTime)); // Calculate step increment
        current += increment;
  
        if (current > end) {
          current = end; // Cap at the final value
        }
      }
  
      const formattedValue = formatNumber(current);
      this.renderer.setProperty(el, 'textContent', formattedValue);
  
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
