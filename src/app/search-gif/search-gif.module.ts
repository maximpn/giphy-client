import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { SharedModule } from '../shared/shared.module';

import { GifImageComponent } from './components/gif-image/gif-image.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { SearchResultComponent } from './components/search-results/search-result.component';
import { SearchTextResolverService } from './services/search-text-resolver.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, SharedModule, FormsModule, ClipboardModule],
  providers: [SearchTextResolverService],
  declarations: [SearchFieldComponent, SearchResultComponent, GifImageComponent],
  exports: [SearchFieldComponent, SearchResultComponent],
})
export class SearchGifModule {}
