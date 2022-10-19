import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksResolve } from './books-resolve.service';
import { BookAddComponent } from './book-add/book-add.component';

const BOOKS_ROUTES: Routes = [
  { 
    path: 'books/:id',
    component: <any>BookDetailsComponent,
    resolve: { book: BooksResolve }
  },
  {
    path: 'addBook',
    component: <any>BookAddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(BOOKS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class BookRoutingModule { }
