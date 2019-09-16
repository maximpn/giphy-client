import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export type DataFetcher<T> = (pageSize: number, offset: number) => Observable<T[]>;

export class Pager<T> {
  private currentOffset = 0;

  constructor(private fetcher: DataFetcher<T>, private pageSize: number) {}

  getNextPage(): Observable<T[]> {
    if (this.currentOffset === -1) {
      return EMPTY;
    }

    return this.fetcher(this.pageSize, this.currentOffset).pipe(
      tap(data => this.updateOffset(data.length)),
    );
  }

  private updateOffset(fetchedCount: number): void {
    this.currentOffset += this.pageSize;

    if (fetchedCount < this.pageSize) {
      this.currentOffset = -1;
    }
  }
}
