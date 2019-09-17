import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';

import { GiphyService } from '../../../shared/services/giphy.service';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  const activatedRouteMock = jasmine.createSpyObj('Router', ['navigate']);

  const routeData$ = new Subject<any>();
  activatedRouteMock.data = routeData$;

  const giphyServiceMock = jasmine.createSpyObj('GiphyService', {
    searchGif: of({ data: [] }),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: GiphyService, useValue: giphyServiceMock },
      ],
    });

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an empty data fetcher', () => {
    expect(component.dataFetcher).toBeUndefined();
  });

  it('should create a new data fetcher when router data arrived', () => {
    component.ngOnInit();
    routeData$.next({ searchText: 'some text' });

    expect(component.dataFetcher).toBeDefined();
  });

  it('should set new stream when it arrived', () => {
    const expected = of();

    component.onNewDataStream(expected as any);

    const actual = component.gifs$;

    expect(actual).toBe(expected);
  });
});
