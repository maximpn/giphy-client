import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { GiphyService } from '../../../shared/services/giphy.service';
import { DataFetcher, Pager } from '../../../shared/services/pager';
import { PagerService } from '../../../shared/services/pager.service';
import { Gif } from '../../models/dto/giphy/gif.dto';

const PAGE_SIZE = 25;

@Component({
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit, OnDestroy {
  gifs$: Observable<Gif[]>;

  private requestNextPage$ = new Subject();
  private unsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private giphyService: GiphyService,
    private pagerService: PagerService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    const pager$ = this.route.data.pipe(
      map(data => {
        const fetcher = this.createDataFetcher(data.searchText);

        return this.pagerService.createPager(fetcher, PAGE_SIZE);
      }),
    );

    const fetchGifs = (pager: Pager<Gif>) => {
      return this.requestNextPage$.pipe(
        startWith(0),
        switchMap(() => pager.getNextPage()),
        scan((merged, gifs) => merged.concat(gifs), []),
      );
    };

    this.gifs$ = pager$.pipe(
      switchMap(fetchGifs),
      takeUntil(this.unsubscribe),
      shareReplay(),
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onYReachEnd(): void {
    this.ngZone.run(() => this.requestNextPage$.next());
  }

  trackByFn(index: number, item: Gif): string {
    return item.embed_url;
  }

  private createDataFetcher(searchText: string): DataFetcher<Gif> {
    return (pageSize: number, offset: number) =>
      this.giphyService.searchGif(searchText, pageSize, offset).pipe(map(result => result.data));
  }
}
