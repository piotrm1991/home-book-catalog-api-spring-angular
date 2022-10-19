import { NgModule } from '@angular/core';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorResolve } from './author-resolve.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthorAddComponent } from './author-add/author-add.component';

const AUTHORS_ROUTES: Routes = [
  { 
    path: 'authors/:id',
    component: <any>AuthorDetailsComponent,
    resolve: { author: AuthorResolve }
  },
  {
    path: 'addAuthor',
    component: <any>AuthorAddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(AUTHORS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthorsRoutingModule { }
