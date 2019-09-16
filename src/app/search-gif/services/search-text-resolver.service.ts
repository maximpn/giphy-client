import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { UrlEncoderService } from '../../shared/services/url-encoder.service';

@Injectable()
export class SearchTextResolverService implements Resolve<string> {
  constructor(private urlEncoderService: UrlEncoderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Observable<never> {
    if (route.url.length === 0) {
      return EMPTY;
    }

    const encodedSearchText = route.url[0].path;

    const searchText = this.urlEncoderService.decode(encodedSearchText);

    return of(searchText);
  }
}
