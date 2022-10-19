import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Room } from 'src/app/models/rooms';
import { RoomsService } from './rooms.service';

@Injectable({
  providedIn: 'root'
})
export class RoomResolve implements Resolve<Room> {

  constructor(private roomService : RoomsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.roomService.getRoom(route.params['id']);
  }
}
