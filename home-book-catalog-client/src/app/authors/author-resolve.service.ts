import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Author } from '../models/author';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorResolve implements Resolve<Author> {

  constructor(private authorService : AuthorsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.authorService.getAuthor(route.params['id']);
  }
}
