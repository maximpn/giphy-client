import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { scan, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { DataFetcher, Pager } from '../../services/pager';
import { PagerService } from '../../services/pager.service';

const PAGE_SIZE = 25;

@Component({
  selector: 'app-infinity-scroll',
  templateUrl: 'infinity-scroll.component.html',
  styleUrls: ['infinity-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfinityScrollComponent<T> implements OnChanges, OnInit, OnDestroy {
  @Input()
  dataFetcher: DataFetcher<T>;

  @Output()
  dataStream = new EventEmitter<Observable<T[]>>();

  data$: Observable<T[]>;

  private pager$ = new ReplaySubject<Pager<T>>(1);
  private requestNextPage$ = new Subject();
  private unsubscribe = new Subject();

  constructor(
    private pagerService: PagerService,
    private ngZone: NgZone,
  ) {}

  ngOnChanges(changes): void {
    if ('dataFetcher' in changes) {
      const pager = this.pagerService.createPager(this.dataFetcher, PAGE_SIZE);

      this.pager$.next(pager);
    }
  }

  ngOnInit(): void {
    this.pager$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(pager => {
      this.data$ = this.fetchData(pager);

      this.dataStream.emit(this.data$);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onYReachEnd(): void {
    this.ngZone.run(() => this.requestNextPage$.next());
  }

  private fetchData(pager: Pager<T>): Observable<T[]> {
    return this.requestNextPage$.pipe(
      startWith(0),
      switchMap(() => pager.getNextPage()),
      scan((merged, data) => merged.concat(data), []),
    );
  }
}
