import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentsModule } from './components/shared-components.module';

import { MaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule, SharedComponentsModule],
  exports: [MaterialModule, BrowserAnimationsModule, SharedComponentsModule],
})
export class SharedModule {}
