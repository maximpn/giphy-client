import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GIPHY_SERVICE_CONFIG, GiphyServiceConfig } from './giphy-service-config';
import { GiphyService } from './giphy.service';

describe('GiphyService', () => {
  let service: GiphyService;
  let http: HttpTestingController;

  const configMock: GiphyServiceConfig = {
    apiKey: 'some-key',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GiphyService, { provide: GIPHY_SERVICE_CONFIG, useValue: configMock }],
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(GiphyService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should search gifs', () => {
    const expected = {
      data: [{}, {}, {}],
      meta: {},
      pagination: {},
    };
    let actual: any;

    service.searchGif('some search text', 50, 10).subscribe(result => (actual = result));

    const request = http.expectOne(
      'https://api.giphy.com/v1/gifs/search?api_key=some-key&limit=50&offset=10&q=some%20search%20text&rating=g&lang=en',
    );
    request.flush(expected);

    expect(actual).toEqual(expected);
  });

  it('should search gifs with default limit and offset', () => {
    const expected = {
      data: [{}, {}, {}],
      meta: {},
      pagination: {},
    };
    let actual: any;

    service.searchGif('some search text').subscribe(result => (actual = result));

    const request = http.expectOne(
      'https://api.giphy.com/v1/gifs/search?api_key=some-key&limit=25&offset=0&q=some%20search%20text&rating=g&lang=en',
    );
    request.flush(expected);

    expect(actual).toEqual(expected);
  });
});
