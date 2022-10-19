import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Book } from '../models/book';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class BooksResolve implements Resolve<Book> {

  constructor(private bookService : BooksService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.bookService.getBook(route.params['id']);
  }
}
