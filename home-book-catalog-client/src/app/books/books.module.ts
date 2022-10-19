import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SharedModule } from '../shared-module/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksResolve } from './books-resolve.service';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    BooksListComponent,
    BookAddComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  exports: [
    BooksListComponent
  ],
  providers: [
    BooksResolve
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BooksModule { }
