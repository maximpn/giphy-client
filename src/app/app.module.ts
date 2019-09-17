import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { GIPHY_SERVICE_CONFIG, GiphyServiceConfig } from './shared/services/giphy-service-config';

const gyphyServiceConfig: GiphyServiceConfig = {
  apiKey: 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
};

@NgModule({
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  providers: [{ provide: GIPHY_SERVICE_CONFIG, useValue: gyphyServiceConfig }],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
