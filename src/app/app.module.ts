import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
