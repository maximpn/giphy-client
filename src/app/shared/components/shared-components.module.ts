import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InfinityScrollComponent } from './infinity-scroll/infinity-scroll.component';

@NgModule({
  imports: [CommonModule, PerfectScrollbarModule,],
  declarations: [InfinityScrollComponent],
  exports: [InfinityScrollComponent],
})
export class SharedComponentsModule {}
