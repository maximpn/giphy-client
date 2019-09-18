import { Component, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';

import { Gif } from '../../models/dto/giphy/gif.dto';
import { Image } from '../../models/dto/giphy/image';

@Component({
  selector: 'app-gif-image',
  templateUrl: 'gif-image.component.html',
  styleUrls: ['gif-image.component.scss'],
})
export class GifImageComponent implements OnChanges {
  @Input()
  gif: Gif;

  src: string;
  width: number;
  height: number;

  constructor(private clipboardService: ClipboardService, private snackBar: MatSnackBar) {}

  ngOnChanges(changes): void {
    if ('gif' in changes) {
      this.setImageProperties(this.gif.images.fixed_height);
    }
  }

  onLinkIconClick(): void {
    this.clipboardService.copyFromContent(this.src);
    this.snackBar.open('The link was copied to the clipboard! 🥳', undefined, {
      duration: 1000,
    });
  }

  private setImageProperties(imageData: Image): void {
    this.src = imageData.webp;
    this.width = parseInt(imageData.width, 10) || undefined;
    this.height = parseInt(imageData.height, 10) || undefined;
  }
}
