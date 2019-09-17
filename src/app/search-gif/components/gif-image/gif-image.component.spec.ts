import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';

import { GifImageComponent } from './gif-image.component';

describe('GifImageComponent', () => {
  let component: GifImageComponent;
  let fixture: ComponentFixture<GifImageComponent>;

  const clipboardServiceMock = jasmine.createSpyObj('ClipboardService', ['copyFromContent']);

  const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GifImageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ClipboardService, useValue: clipboardServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    });

    fixture = TestBed.createComponent(GifImageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set image data when new image arrive', () => {
    component.gif = {
      images: {
        fixed_height: {
          webp: 'webp-data',
          width: '100',
          height: '100',
        },
      },
    } as any;

    const change = new SimpleChange(undefined, component.gif, true);
    component.ngOnChanges({ gif: change });

    expect(component.src).toBe('webp-data');
    expect(component.width).toBe(100);
    expect(component.height).toBe(100);
  });

  it('should copy a link into the clipboard buffer', () => {
    component.src = 'some-link';

    component.onLinkIconClick();

    expect(clipboardServiceMock.copyFromContent).toHaveBeenCalledWith('some-link');
  });

  it('should show a snack bar when a link is copied', () => {
    component.onLinkIconClick();

    expect(snackBarMock.open).toHaveBeenCalledWith(
      'The link was copied to the clipboard! 🥳',
      undefined,
      { duration: 1000 },
    );
  });
});
