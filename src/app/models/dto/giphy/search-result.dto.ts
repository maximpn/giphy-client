import { Gif } from './gif.dto';
import { Meta } from './meta.dto';
import { Pagination } from './pagination.dto';

export interface SearchResult {
  data: Gif[];
  pagination: Pagination;
  meta: Meta;
}
