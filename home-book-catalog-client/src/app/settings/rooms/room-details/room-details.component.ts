import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/rooms';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'hb-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.less']
})
export class RoomDetailsComponent implements OnInit {

  room! : Room;

  roomForm! : FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private roomService : RoomsService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadRoom();
    this.roomForm = this.buildRoomForm();
  }

  loadRoom() {
    this.room = this.route.snapshot.data['room'];
  }

  buildRoomForm() {
    this.name.patchValue(this.room.name);
    return this.formBuilder.group({
      name: this.name
    });
  }

  updateRoom() {
    this.roomService.updateRoom(this.room.id, this.roomForm.value).subscribe(() => {
      this.router.navigate(['/settings']);  
    });
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.room.id).subscribe(() => {
      this.router.navigate(['/settings']);
    })
  }

  resetToOriginal() {
    this.name.patchValue(this.room.name);
  }
  
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
