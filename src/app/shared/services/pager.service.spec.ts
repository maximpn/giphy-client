import { of } from 'rxjs';
import { first } from 'rxjs/operators';

import { Pager } from './pager';
import { PagerService } from './pager.service';

describe('PagerService', () => {
  let service: PagerService;

  const dataMock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  beforeEach(() => {
    service = new PagerService();
  });

  it('should return pager', () => {
    const fetcher: any = () => {};

    const expected = new Pager(fetcher, 10);

    const actual = service.createPager(fetcher, 10);

    expect(actual).toEqual(expected);
  });

  describe('when pager is created', () => {
    const fetcher = jasmine.createSpy();
    let pager: Pager<number>;

    beforeEach(() => {
      fetcher.and.returnValues(of(dataMock), of(dataMock), of(dataMock.slice(0, 5)));

      pager = service.createPager(fetcher, 10);
    });

    it('should call fetcher', () => {
      pager.getNextPage();

      expect(fetcher).toHaveBeenCalledWith(10, 0);
    });

    it('should call fetcher until all data is fetched', () => {
      pager
        .getNextPage()
        .pipe(first())
        .subscribe();
      pager
        .getNextPage()
        .pipe(first())
        .subscribe();
      pager
        .getNextPage()
        .pipe(first())
        .subscribe();
      pager.getNextPage().subscribe();

      expect(fetcher).toHaveBeenCalledWith(10, 0);
      expect(fetcher).toHaveBeenCalledWith(10, 10);
      expect(fetcher).toHaveBeenCalledWith(10, 20);
      expect(fetcher).not.toHaveBeenCalledWith(10, 30);
    });
  });
});
