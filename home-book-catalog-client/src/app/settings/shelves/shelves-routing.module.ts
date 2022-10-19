import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfAddComponent } from './shelf-add/shelf-add.component';
import { ShelfDetailsComponent } from './shelf-details/shelf-details.component';
import { ShelvesResolve } from './shelves-resolve.service';

const SHELVES_ROUTES: Routes = [
  { 
    path: 'settings/shelves/:id',
    component: <any>ShelfDetailsComponent,
    resolve: { shelf: ShelvesResolve }
  },
  {
    path: 'addShelves',
    component: <any>ShelfAddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(SHELVES_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class ShelvesRoutingModule { }
