import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage!: number;
  @Input() lastPage!: number;
  @Input() links!: any [];
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.shouldUpdatePagination(changes)) {
      this.generatePageNumbers();
    }
  }

  private shouldUpdatePagination(changes: SimpleChanges): boolean {
    return !!(
      changes['currentPage']?.currentValue !==
        changes['currentPage']?.previousValue ||
      changes['lastPage']?.currentValue !==
        changes['lastPage']?.previousValue ||
      changes['links']?.currentValue !== changes['links']?.previousValue
    );
  }

  private generatePageNumbers(): void {
    const totalPages = Math.min(this.lastPage, 7); // Show max 7 pages
    let startPage = Math.max(1, this.currentPage - 3);
    let endPage = Math.min(this.lastPage, startPage + 6);

    if (endPage - startPage < 6) {
      startPage = Math.max(1, endPage - 6);
    }

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  goToPage(page: number | null): void {
    if (page && this.isValidPageNumber(page)) {
      this.pageChange.emit(page);
    }
  }

  private isValidPageNumber(page: number): boolean {
    return page !== this.currentPage && page >= 1 && page <= this.lastPage;
  }

  getPrevPage(): number | null {
    return this.currentPage > 1 ? this.currentPage - 1 : null;
  }

  getNextPage(): number | null {
    return this.currentPage < this.lastPage ? this.currentPage + 1 : null;
  }
}
