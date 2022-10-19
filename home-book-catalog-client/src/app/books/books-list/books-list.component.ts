import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from '../books.service';

interface Filter {
  filterFlag: number,
  filterValue: string
}

@Component({
  selector: 'hb-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.less']
})
export class BooksListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'author', 'publisher', 'room', 'status'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  books : Book[] = [];

  constructor(private booksService : BooksService,
              private router : Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadBooks() : void{
    this.booksService.getBooks().subscribe((books) => {
      this.dataSource = new MatTableDataSource(books);
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToBookDetails(Book : Book) {
    this.router.navigate(['/books', Book.id]);
  }

  goToNewBook() {
    this.router.navigate(['/addBook']);
  }
}
