import { Injectable } from '@angular/core';
import * as XRegExp from 'xregexp';

@Injectable({
  providedIn: 'root',
})
export class UrlEncoderService {
  encode(input: string): string {
    return input.replace(/\s+/g, '-')
       .replace(XRegExp('[^\\pL0-9-]', 'g'), '')
  }

  decode(input: string): string {
    return input.replace('-', ' ');
  }
}
