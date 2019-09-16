import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

@NgModule({
  exports: [MaterialModule, BrowserAnimationsModule],
})
export class SharedModule {}
