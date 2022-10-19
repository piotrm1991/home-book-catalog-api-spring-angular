import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { StatusType } from 'src/app/models/status-type';
import { StatusTypesService } from './status-types.service';

@Injectable({
  providedIn: 'root'
})
export class StatusTypeResolve implements Resolve<StatusType> {

  constructor(private statusTypeService : StatusTypesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.statusTypeService.getStatusType(route.params['id']);
  }
}
