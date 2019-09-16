import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { GiphyService } from '../../../shared/services/giphy.service';
import { PagerService } from '../../../shared/services/pager.service';

const PAGE_SIZE = 25;

export const pagerServiceFactory = (route: ActivatedRoute, giphyService: GiphyService) => {
  const searchText = route.snapshot.data.searchText;

  const fetcher = (pageSize: number, offset: number) => giphyService.searchGif(searchText, pageSize, offset)
    .pipe(
      map(result => ({
        data: result.data,
        fetchedCount: result.pagination.count,
        totalCount: result.pagination.total_count
      })),
    );

  return new PagerService(fetcher, PAGE_SIZE);
};
