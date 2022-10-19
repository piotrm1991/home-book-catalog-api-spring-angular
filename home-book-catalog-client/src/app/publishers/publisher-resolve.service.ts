import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Publisher } from '../models/publisher';
import { PublishersService } from './publishers.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherResolve implements Resolve<Publisher> {

  constructor(private publisherService : PublishersService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.publisherService.getPublisher(route.params['id']);
  }
}
