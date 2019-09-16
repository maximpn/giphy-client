import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../../search-gif/models/dto/giphy/search-result.dto';

const GIPHY_API_ENDPOINT = 'https://api.giphy.com';
const VERSION = 'v1';
const API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  constructor(private http: HttpClient) {}

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
      fromObject: { api_key: API_KEY }
    });
  }

  private getDefaultParamsWithPagination(limit: number, offset: number): HttpParams {
    return this.getDefaultParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
  }
}
