import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UrlEncoderService } from '../../../shared/services/url-encoder.service';

@Component({
  selector: 'app-search-field',
  templateUrl: 'search-field.component.html',
  styleUrls: ['search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Output()
  valueChange = new EventEmitter<string>();

  searchText = '';

  private unsubscribe = new Subject();

  constructor(
    private urlEncoderService: UrlEncoderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.unsubscribe),
      filter(e => e instanceof ActivationEnd),
    ).subscribe((event: ActivationEnd) => {
      const data = event.snapshot.data;

      this.searchText = data.searchText || '';
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSearchButtonClick(e: MouseEvent): void {
    e.preventDefault();

    this.navigateToSearchPage(this.searchText);
  }

  onEnter(): void {
    this.navigateToSearchPage(this.searchText);
  }

  navigateToSearchPage(searchText: string): void {
    const encodedSearchText = this.urlEncoderService.encode(searchText);

    this.router.navigate([encodedSearchText]);
  }
}
