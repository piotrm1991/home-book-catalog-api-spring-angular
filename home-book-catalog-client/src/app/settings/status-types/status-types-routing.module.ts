import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusTypeAddComponent } from './status-type-add/status-type-add.component';
import { StatusTypeDetailsComponent } from './status-type-details/status-type-details.component';
import { StatusTypeResolve } from './status-type-resolve.service';

const STATUS_TYPES_ROUTES: Routes = [
  { 
    path: 'settings/statusTypes/:id',
    component: <any>StatusTypeDetailsComponent,
    resolve: { statusType: StatusTypeResolve }
  },
  {
    path: 'addStatusType',
    component: <any>StatusTypeAddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(STATUS_TYPES_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class StatusTypesRoutingModule { }
