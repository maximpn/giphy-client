import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchGifModule } from '../search-gif/search-gif.module';
import { MaterialModule } from '../shared/material.module';

import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [CommonModule, MaterialModule, SearchGifModule],
  declarations: [HeaderComponent, WelcomeComponent],
  exports: [HeaderComponent, WelcomeComponent]
})
export class ComponentsModule {}
