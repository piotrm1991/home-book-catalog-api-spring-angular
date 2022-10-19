import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { SharedModule } from '../shared-module/shared.module';
import { RouterModule } from '@angular/router';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorResolve } from './author-resolve.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorAddComponent } from './author-add/author-add.component';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorDetailsComponent,
    AuthorAddComponent,
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
    MatPaginatorModule
  ],
  exports: [
    AuthorsListComponent
  ],
  providers: [
    AuthorResolve
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AuthorsModule { }
