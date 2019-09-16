import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';

import { UrlEncoderService } from '../../shared/services/url-encoder.service';

import { SearchTextResolverService } from './search-text-resolver.service';

describe('SearchTextResolverService', () => {
  let service: SearchTextResolverService;

  const urlEncoderServiceMock = jasmine.createSpyObj('UrlEncoderService', ['decode']);

  const activatedRouteSnapshotMock: ActivatedRouteSnapshot = {
    url: [{ path: 'search-path' }],
  } as any;

  const routerStateSnapshotMock: RouterStateSnapshot = {} as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchTextResolverService,
        { provide: UrlEncoderService, useValue: urlEncoderServiceMock },
      ],
    });

    service = TestBed.get(SearchTextResolverService);
  });

  it('should call UrlEncoderService:decode method', () => {
    service.resolve(activatedRouteSnapshotMock, routerStateSnapshotMock);

    expect(urlEncoderServiceMock.decode).toHaveBeenCalledWith('search-path');
  });

  it('should resolve the search text', () => {
    const expected = 'some text';

    urlEncoderServiceMock.decode.and.returnValue(expected);

    let actual: string;

    service
      .resolve(activatedRouteSnapshotMock, routerStateSnapshotMock)
      .subscribe(x => (actual = x));

    expect(actual).toBe(expected);
  });

  it('should return completed observable when the url is empty', () => {
    const localActivatedRouteSnapshotMock: ActivatedRouteSnapshot = {
      url: [],
    } as any;

    let actual = false;
    service
      .resolve(localActivatedRouteSnapshotMock, routerStateSnapshotMock)
      .subscribe(() => {}, () => {}, () => (actual = true));

    expect(actual).toBeTruthy();
  });
});
