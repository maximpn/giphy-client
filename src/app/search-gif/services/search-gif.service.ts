import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchGifService {
  private searchRequest = new ReplaySubject<string>(1);

  searchForGif
}
