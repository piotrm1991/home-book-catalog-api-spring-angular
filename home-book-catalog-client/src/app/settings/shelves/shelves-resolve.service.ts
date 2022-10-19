import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Shelf } from 'src/app/models/shelf';
import { ShelvesService } from './shelves.service';

@Injectable({
  providedIn: 'root'
})
export class ShelvesResolve implements Resolve<Shelf> {

  constructor(private shelfService : ShelvesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.shelfService.getShelf(route.params['id']);
  }
}
