import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomResolve } from './room-resolve.service';

const ROOMS_ROUTES: Routes = [
  { 
    path: 'settings/rooms/:id',
    component: <any>RoomDetailsComponent,
    resolve: { room: RoomResolve }
  },
  {
    path: 'addRoom',
    component: <any>RoomAddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROOMS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class RoomsRoutingModule { }
