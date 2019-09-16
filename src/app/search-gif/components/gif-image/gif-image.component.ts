import { Component, Input, OnChanges } from '@angular/core';

import { Gif } from '../../models/dto/giphy/gif.dto';
import { Image } from '../../models/dto/giphy/image';

@Component({
  selector: 'app-gif-image',
  templateUrl: 'gif-image.component.html'
})
export class GifImageComponent implements OnChanges {
  @Input()
  gif: Gif;

  src: string;
  width: number;
  height: number;

  ngOnChanges(changes): void {
    if ('gif' in changes) {
      this.setImageProperties(this.gif.images.fixed_width);
    }
  }

  private setImageProperties(imageData: Image): void {
    this.src = imageData.webp;
    this.width = parseInt(imageData.width, 10) || undefined;
    this.height = parseInt(imageData.height, 10) || undefined;
  }
}
