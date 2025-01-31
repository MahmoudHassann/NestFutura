import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-image-viewer',
  imports: [CommonModule,DragDropModule],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent {
  @Input() images: string[] = [];
  activeIndex = signal(0);

  setActiveIndex(index: number) {
    this.activeIndex.set(index);
  }

  openFullscreen() {
    const elem = document.querySelector('.fullscreen-image img') as HTMLElement;
    elem.requestFullscreen();
  }

  drop(event: any) {
    const fromIndex = event.previousIndex;
    const toIndex = event.currentIndex;
    [this.images[fromIndex], this.images[toIndex]] = [this.images[toIndex], this.images[fromIndex]];
    this.setActiveIndex(toIndex);
  }
}
