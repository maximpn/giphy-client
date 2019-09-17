import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { PagerService } from '../../services/pager.service';

import { InfinityScrollComponent } from './infinity-scroll.component';

describe('InfinityScrollComponent', () => {
  let component: InfinityScrollComponent<any>;
  let fixture: ComponentFixture<InfinityScrollComponent<any>>;

  const data$ = new Subject<any[]>();

  const pagerMock = jasmine.createSpyObj('Pager', {
    getNextPage: data$,
  });

  const pagerServiceMock = jasmine.createSpyObj('PagerService', {
    createPager: pagerMock,
  });

  const dataFetcherMock: any = () => {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfinityScrollComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: PagerService, useValue: pagerServiceMock }],
    });

    fixture = TestBed.createComponent(InfinityScrollComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a new data stream when new pager is emitted', () => {
    let actual: any;

    component.dataFetcher = dataFetcherMock;
    component.dataStream.pipe(first()).subscribe(x => (actual = x));

    const change = new SimpleChange(undefined, component.dataFetcher, true);

    component.ngOnChanges({ dataFetcher: change });
    component.ngOnInit();

    expect(actual).toBeDefined();
    expect(actual.pipe).toBeDefined();
  });

  describe('when initialized', () => {
    let receivedData: any[];

    beforeEach(() => {
      const change = new SimpleChange(undefined, component.dataFetcher, true);

      component.dataStream.pipe(switchMap(x => x)).subscribe(x => (receivedData = x));

      component.ngOnChanges({ dataFetcher: change });
      component.ngOnInit();

      fixture.detectChanges();

      data$.next([1, 2, 3]);
    });

    it('should emit the first page of data', () => {
      expect(receivedData).toEqual([1, 2, 3]);
    });

    it('should emit data when it is scrolled to bottom', () => {
      component.onYReachEnd();

      data$.next([4, 5, 6]);

      expect(receivedData).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
