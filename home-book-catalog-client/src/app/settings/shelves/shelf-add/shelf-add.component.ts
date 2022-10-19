import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/rooms';
import { Shelf } from 'src/app/models/shelf';
import { RoomsService } from '../../rooms/rooms.service';
import { ShelvesService } from '../shelves.service';

@Component({
  selector: 'hb-shelf-add',
  templateUrl: './shelf-add.component.html',
  styleUrls: ['./shelf-add.component.less']
})
export class ShelfAddComponent implements OnInit {

  shelf! : Shelf;
  
  shelfForm! : FormGroup;

  rooms! : Room[];

  roomControl = new FormControl(null, Validators.required);

  letterControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[a-zA-Z ]*')]);

  numberControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('^[0-9]*$')]);

  constructor(private shelvesService : ShelvesService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder,
              private roomService : RoomsService) {

              }

  ngOnInit(): void {
    this.shelfForm = this.buildShelfForm();
    this.getRoomsForSelect();
  }

  getRoomsForSelect() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
    });
  }

  buildShelfForm() {
    return this.formBuilder.group({
      room: this.roomControl,
      letter: this.letterControl,
      number: this.numberControl,
    });
  }

  addShelf() {
    this.shelvesService.addShelf(this.shelfForm.value).subscribe(() => {
      this.router.navigate(['/settings']);  
    });
  }

  getErrorMessageRoom() {
    return (this.roomControl.hasError('required')) ? 'You must choose room' : '';
  }

  getErrorMessageLetter() {
    if (this.letterControl.hasError('required')) {
      return 'You must enter a title';
    } else if (this.letterControl.hasError('minlength') || this.letterControl.hasError('maxlength')) {
      return 'min 1 max 3 characters';
    }

    return (this.letterControl.hasError('pattern')) ?  'Characters only': '';
  }

  getErrorMessageNumber() {
    if (this.numberControl.hasError('required')) {
      return 'You must enter a title';
    } else if (this.numberControl.hasError('minlength') || this.numberControl.hasError('maxlength')) {
      return 'min 1 max 3 characters';
    }

    return (this.numberControl.hasError('pattern')) ?  'Numbers only': '';
  }
}
