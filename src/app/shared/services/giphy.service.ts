import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../../search-gif/models/dto/giphy/search-result.dto';

import { GIPHY_SERVICE_CONFIG, GiphyServiceConfig } from './giphy-service-config';

const GIPHY_API_ENDPOINT = 'https://api.giphy.com';
const VERSION = 'v1';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(
    @Inject(GIPHY_SERVICE_CONFIG) private config: GiphyServiceConfig,
    private http: HttpClient,
  ) {
    if (!config.apiKey) {
      throw new Error('GiphyService: API key must be set through GIPHY_SERVICE_CONFIG.');
    }
  }

  searchGif(searchText: string, limit = 25, offset = 0): Observable<SearchResult> {
    const endpoint = `${this.getBaseUrl()}/gifs/search`;

    const params = this.getDefaultParamsWithPagination(limit, offset)
      .set('q', searchText)
      .set('rating', 'g')
      .set('lang', 'en');

    return this.http.get<SearchResult>(endpoint, { params });
  }

  private getBaseUrl(): string {
    return `${GIPHY_API_ENDPOINT}/${VERSION}`;
  }

  private getDefaultParams(): HttpParams {
    return new HttpParams({
      fromObject: { api_key: this.config.apiKey },
    });
  }

  private getDefaultParamsWithPagination(limit: number, offset: number): HttpParams {
    return this.getDefaultParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
  }
}
