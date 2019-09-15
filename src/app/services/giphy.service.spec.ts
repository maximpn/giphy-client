import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GiphyService } from './giphy.service';

describe('GiphyService', () => {
  let service: GiphyService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GiphyService]
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
      pagination: {}
    };
    let actual: any;

    service.searchGif('some search text', 50, 10).subscribe((result) => (actual = result));

    const request = http.expectOne(
      'http://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&limit=50&offset=10&q=some%20search%20text&rating=g&lang=en'
    );
    request.flush(expected);

    expect(actual).toEqual(expected);
  });
});
