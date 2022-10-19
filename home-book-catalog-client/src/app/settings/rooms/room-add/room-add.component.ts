import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/rooms';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'hb-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.less']
})
export class RoomAddComponent implements OnInit {

  room! : Room;
  
  roomForm! : FormGroup;

  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  constructor(private roomService : RoomsService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.roomForm = this.buildRoomForm();
  }

  buildRoomForm() {
    return this.formBuilder.group({
      name: this.name,
    });
  }

  addRoom() {
    this.roomService.addRoom(this.roomForm.value).subscribe(() => {
      this.router.navigate(['/settings']);  
    });
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return (this.name.hasError('minlength') || this.name.hasError('maxlenght')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }
}
