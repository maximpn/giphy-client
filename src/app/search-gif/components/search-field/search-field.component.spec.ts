import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { UrlEncoderService } from '../../../shared/services/url-encoder.service';

import { SearchFieldComponent } from './search-field.component';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;

  const urlEncoderServiceMock = jasmine.createSpyObj('UrlEncoderService', {
    encode: 'search-text',
  });

  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  const routerEvents$ = new Subject<any>();
  routerMock.events = routerEvents$;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFieldComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UrlEncoderService, useValue: urlEncoderServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the search page when the search button is clicked', () => {
    component.onSearchButtonClick(new MouseEvent('click'));

    expect(routerMock.navigate).toHaveBeenCalledWith(['search-text']);
  });

  it('should navigate to the search page when Enter is pressed', () => {
    component.onEnter();

    expect(routerMock.navigate).toHaveBeenCalledWith(['search-text']);
  });

  it("should take search text from the active route' data", () => {
    const expected = 'some text';

    const eventMock = new ActivationEnd({
      data: { searchText: expected },
    } as any);

    component.ngOnInit();
    routerEvents$.next(eventMock);

    const actual = component.searchText;

    expect(actual).toBe(expected);
  });
});
