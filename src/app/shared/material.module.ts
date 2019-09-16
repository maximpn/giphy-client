import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatRippleModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatRippleModule,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}
