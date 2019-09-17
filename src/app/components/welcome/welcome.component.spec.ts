import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain welcome text', () => {
    const expectedSentence1 = 'Welcome to the GIPHY search client!';
    const expectedSentence2 = 'Type something in the search field to find gif images.';

    const actual = de.nativeElement.textContent.trim();

    expect(actual).toContain(expectedSentence1);
    expect(actual).toContain(expectedSentence2);
  });
});
