import { InjectionToken } from '@angular/core';

export interface GiphyServiceConfig {
  apiKey: string;
}

export const GIPHY_SERVICE_CONFIG = new InjectionToken<GiphyServiceConfig>('GIPHY_SERVICE_CONFIG');
