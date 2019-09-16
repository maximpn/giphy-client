import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { scan, switchMap, takeUntil } from 'rxjs/operators';
import { Gif } from '../../../models/dto/giphy/gif.dto';
import { GiphyService } from '../../../shared/services/giphy.service';
import { PagerService } from '../../../shared/services/pager.service';
import { pagerServiceFactory } from './pager.factory';

@Component({
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss'],
  providers: [
    {
      provide: PagerService,
      useFactory: pagerServiceFactory,
      deps: [ActivatedRoute, GiphyService],
    },
  ]
})
export class SearchResultComponent implements OnInit, OnDestroy {
  gifs$: Observable<Gif[]>;

  private requestNextPage$ = new Subject();
  private unsubscribe = new Subject();

  constructor(private pageService: PagerService<Gif>) {}

  ngOnInit(): void {
    this.gifs$ = this.requestNextPage$.pipe(
      switchMap(() => this.pageService.getNextPage()),
      takeUntil(this.unsubscribe),
      scan((merged, gifs) => merged.concat(gifs), []),
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onYReachEnd(): void {
    this.requestNextPage$.next();
  }

  trackByFn(index: number, item: Gif): string {
    return item.embed_url;
  }
}
