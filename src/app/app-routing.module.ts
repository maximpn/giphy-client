import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SearchResultComponent } from './search-gif/components/search-results/search-result.component';
import { SearchTextResolverService } from './search-gif/search-text-resolver.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent,
  },
  {
    path: ':searchText',
    component: SearchResultComponent,
    resolve: {
      searchText: SearchTextResolverService,
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
