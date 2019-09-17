import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { GiphyService } from '../../../shared/services/giphy.service';
import { DataFetcher } from '../../../shared/services/pager';
import { Gif } from '../../models/dto/giphy/gif.dto';

@Component({
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  dataFetcher: DataFetcher<Gif>;
  gifs$: Observable<Gif[]>;

  private unsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private giphyService: GiphyService,
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(
      takeUntil(this.unsubscribe),
      map(data => data.searchText),
    ).subscribe(searchText => {
      this.dataFetcher = this.createDataFetcher(searchText);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onNewDataStream(data$: Observable<Gif[]>): void {
    this.gifs$ = data$;
  }

  trackByFn(index: number, item: Gif): string {
    return item.embed_url;
  }

  private createDataFetcher(searchText: string): DataFetcher<Gif> {
    return (pageSize: number, offset: number) =>
      this.giphyService.searchGif(searchText, pageSize, offset).pipe(map(result => result.data));
  }
}
