import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AuthorsService } from 'src/app/authors/authors.service';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { Publisher } from 'src/app/models/publisher';
import { Room } from 'src/app/models/rooms';
import { Shelf } from 'src/app/models/shelf';
import { StatusType } from 'src/app/models/status-type';
import { PublishersService } from 'src/app/publishers/publishers.service';
import { RoomsService } from 'src/app/settings/rooms/rooms.service';
import { ShelvesService } from 'src/app/settings/shelves/shelves.service';
import { StatusTypesService } from 'src/app/settings/status-types/status-types.service';
import { BooksService } from '../books.service';

@Component({
  selector: 'hb-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.less']
})
export class BookDetailsComponent implements OnInit {

  book! : Book;
  
  bookForm! : FormGroup;

  rooms! : Room[];

  authors! : Author[];

  publishers! : Publisher[];

  shelves! : Shelf[];

  statusTypes! : StatusType[];

  selectedRoom! : Room;

  selectedShelf! : Shelf;

  selectedStatusType! : StatusType;

  roomControl = new FormControl(null);

  nameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  authorControl = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  publisherControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);

  shelfControl = new FormControl(null, Validators.required);

  statusControl = new FormControl(null, Validators.required);

  commentControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(250)]);

  filteredOptionsAuthors!: Observable<Author[]>;

  filteredOptionsPublishers!: Observable<Publisher[]>;

  constructor(private booksService : BooksService,
              private route : ActivatedRoute,
              private router : Router,
              private formBuilder : FormBuilder,
              private roomService : RoomsService,
              private authorsService : AuthorsService,
              private publishersService : PublishersService,
              private shevesService : ShelvesService,
              private statusTypeService : StatusTypesService) { }

  ngOnInit(): void {
    this.loadBook();
    this.bookForm = this.buildBookForm();
    this.getRoomsForSelect();
    this.getAuthorsForSelect();
    this.getPublishersForSelect();
    this.getShelvesForSelect(this.book.shelf.room.id);
    this.getStatusTypesForSelect();
    this.patchBookValues();
  }

  loadBook() {
    this.book = this.route.snapshot.data['book'];
  }

  patchBookValues() {
    this.nameControl.patchValue(this.book.name);

    this.bookForm.get('author.id')?.patchValue(this.book.author.id);
    this.authorControl.patchValue(this.book.author.name);

    this.bookForm.get('publisher.id')?.patchValue(this.book.publisher.id);
    this.publisherControl.patchValue(this.book.publisher.name);

    this.shelfControl.patchValue(this.book.shelf);
    this.roomControl.patchValue(this.book.shelf.room);
    this.selectedRoom = this.book.shelf.room;
    this.selectedShelf = this.book.shelf;

    this.bookForm.get('status')?.patchValue(this.book.status);
    this.commentControl.patchValue(this.book.status.comment);
    this.selectedStatusType = this.book.status.statusType;
  }

  changeShelfSelection(e : MatSelectChange) {
    this.getShelvesForSelect(e.value.id);
  }
  
  resetToOriginal() {
    this.ngOnInit();
  }

  getRoomsForSelect() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
    });
  }

  getAuthorsForSelect() {
    this.authorsService.getAuthors().subscribe(res => {
      this.authors = res;
      this.filteredOptionsAuthors = this.authorControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterAuthor(value)),
      );
    });
  }

  getPublishersForSelect() {
    this.publishersService.getPublishers().subscribe(res => {
      this.publishers = res;
      this.filteredOptionsPublishers = this.publisherControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterPublisher(value)),
      );
    });
  }

  getShelvesForSelect(id : number) {
    if (id == 0) {
      this.shevesService.getShelves().subscribe(res => {
        this.shelves = res;
      });
    } else {
      this.shevesService.getShelvesByRoomId(id).subscribe(res => {
        this.shelves = res;
      });
    }
  }

  getStatusTypesForSelect() {
    this.statusTypeService.getStatusTypes().subscribe(res => {
      this.statusTypes = res;
    });
  }

  private _filterPublisher(value: any): Publisher[] {
    let filterValue = '';
    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    } else if(value == null) {
      filterValue = '';
    } else {
      filterValue = value.name.toLowerCase();
    }

    return this.publishers.filter(publisher => publisher.name.toLowerCase().includes(filterValue));
  }

  private _filterAuthor(value: any): Author[] {
    let filterValue = '';
    if (typeof value === "string") {
      filterValue = value.toLowerCase();
    } else if(value == null) {
      filterValue = '';
    } else {
      filterValue = value.name.toLowerCase();
    }

    return this.authors.filter(author => author.name.toLowerCase().includes(filterValue));
  }

  buildBookForm() {
    return this.formBuilder.group({
      name: this.nameControl,
      author: this.formBuilder.group({
        id: null,
        name: this.authorControl
      }),
      publisher: this.formBuilder.group({
        id: null,
        name: this.publisherControl
      }),
      shelf: this.shelfControl,
      status: this.formBuilder.group({
        id: null,
        comment: this.commentControl,
        statusType: this.statusControl
      })
    });
  }

  onSelectAuthor(event : MatAutocompleteSelectedEvent) {
    this.bookForm.get('author')?.patchValue(event.option.value);
  }

  onSelectPublisher(event : MatAutocompleteSelectedEvent) {
    this.bookForm.get('publisher')?.patchValue(event.option.value);
  }

  removeIdAuthor(e : any) {
    this.bookForm.get('author')?.get('id')?.patchValue(null);
  }

  removeIdPublisher(e : any) {
    this.bookForm.get('publisher')?.get('id')?.patchValue(null);
  }

  updateBook() {
    this.booksService.updateBook(this.book.id, this.bookForm.value).subscribe(() => {
      this.router.navigate(['/books']);  
    });
  }

  deleteBook() {
    this.booksService.deleteBook(this.book.id).subscribe(() => {
      this.router.navigate(['/books']);  
    });
  }

  getErrorMessageTitle() {
    if (this.nameControl.hasError('required')) {
      return 'You must enter a title';
    }

    return (this.nameControl.hasError('minlength') || this.nameControl.hasError('maxlength')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }

  getErrorMessageAuthor() {
    if (this.authorControl.hasError('required')) {
      return 'You must enter a author name';
    }

    return (this.authorControl.hasError('minlength') || this.authorControl.hasError('maxlength')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }

  getErrorMessagePublisher() {
    if (this.publisherControl.hasError('required')) {
      return 'You must enter a publisher name';
    }

    return (this.publisherControl.hasError('minlength') || this.publisherControl.hasError('maxlength')) ? 'Name needs more than 3 characters and less than 100!' : '';
  }

  getErrorMessageShelf() {
    return this.shelfControl.hasError('required') ? 'You need to choose shelf!' : '';
  }

  getErrorMessageStatus() {
    return this.statusControl.hasError('required') ? 'You need to choose status!' : '';
  }

  getErrorMessageComment() {
    return (this.commentControl.hasError('minlength') || this.commentControl.hasError('maxlength')) ? 'Name needs more than 3 characters and less than 250!' : '';
  }
}
