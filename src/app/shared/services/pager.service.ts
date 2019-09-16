import { Injectable } from '@angular/core';

import { DataFetcher, Pager } from './pager';

@Injectable({
  providedIn: 'root'
})
export class PagerService {
  createPager<T>(fetcher: DataFetcher<T>, pageSize: number, totalCount?: number): Pager<T> {
    return new Pager(fetcher, pageSize, totalCount);
  }
}
