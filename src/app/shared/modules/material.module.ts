import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatTableModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatChipsModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatChipsModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatChipsModule,
    FormsModule
  ],
})

export class MaterialModule {
}
