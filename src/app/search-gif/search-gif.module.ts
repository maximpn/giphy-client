import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SharedModule } from '../shared/shared.module';
import { GifImageComponent } from './components/gif-image/gif-image.component';

import { SearchFieldComponent } from './components/search-field/search-field.component';
import { SearchResultComponent } from './components/search-results/search-result.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, SharedModule, FormsModule, PerfectScrollbarModule],
  declarations: [SearchFieldComponent, SearchResultComponent, GifImageComponent],
  exports: [SearchFieldComponent, SearchResultComponent]
})
export class SearchGifModule {}
