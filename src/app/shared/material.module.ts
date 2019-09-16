import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatRippleModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatRippleModule,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class MaterialModule {}
