import { EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Pagination<T> {
  data: T[];
  fetchedCount: number;
  totalCount: number;
}

export type DataFetcher<T> = (pageSize: number, offset: number) => Observable<Pagination<T>>;

export class Pager<T> {
  private currentOffset = 0;

  constructor(
    private fetcher: DataFetcher<T>,
    private pageSize: number,
    private totalCount?: number
  ) {}

  getNextPage(): Observable<T[]> {
    if (this.currentOffset === -1) {
      return EMPTY;
    }

    return this.fetcher(this.pageSize, this.currentOffset).pipe(
      tap((result) => this.updateOffset(result)),
      map((result) => result.data)
    );
  }

  private updateOffset(pagination: Pagination<T>): void {
    this.currentOffset += this.pageSize;

    if (pagination.totalCount && this.totalCount !== pagination.totalCount) {
      this.totalCount = pagination.totalCount;
    }

    if (!this.totalCount) {
      return;
    }

    if (pagination.fetchedCount < this.pageSize) {
      this.currentOffset = -1;
    }
  }
}
