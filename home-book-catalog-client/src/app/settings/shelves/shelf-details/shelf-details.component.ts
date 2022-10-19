import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/rooms';
import { Shelf } from 'src/app/models/shelf';
import { RoomsService } from '../../rooms/rooms.service';
import { ShelvesService } from '../shelves.service';

@Component({
  selector: 'hb-shelf-details',
  templateUrl: './shelf-details.component.html',
  styleUrls: ['./shelf-details.component.less']
})
export class ShelfDetailsComponent implements OnInit {

  shelf! : Shelf;

  shelfForm! : FormGroup;

  rooms! : Room[];

  selectedRoom! : Room;

  roomControl = new FormControl('', Validators.required);

  letterControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('[a-zA-Z ]*')]);

  numberControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern('^[0-9]*$')]);

  constructor(private shelvesService : ShelvesService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder,
              private roomService : RoomsService) { }

  ngOnInit(): void {
    this.loadShelf();
    this.getRoomsForSelect();
    this.shelfForm = this.buildShelfForm();
    this.patchShelfValues();
  }

  loadShelf() {
    this.shelf = this.route.snapshot.data['shelf'];
  }

  getRoomsForSelect() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
    });
  }
  patchShelfValues() {
    this.selectedRoom = this.shelf.room;
    this.roomControl.patchValue(this.shelf.room);
    this.letterControl.patchValue(this.shelf.letter);
    this.numberControl.patchValue(this.shelf.number);
  }

  buildShelfForm() {
    return this.formBuilder.group({
      room: this.roomControl,
      letter: this.letterControl,
      number: this.numberControl,
    });
  }

  updateShelf() {
    this.shelvesService.updateShelf(this.shelf.id, this.shelfForm.value).subscribe(() => {
      this.router.navigate(['/settings']);  
    });
  }

  deleteShelf() {
    this.shelvesService.deleteShelf(this.shelf.id).subscribe(() => {
      this.router.navigate(['/settings']);
    })
  }
  
  resetToOriginal() {
    this.ngOnInit();
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
