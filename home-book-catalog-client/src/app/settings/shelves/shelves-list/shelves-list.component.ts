import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Shelf } from 'src/app/models/shelf';
import { ShelvesService } from '../shelves.service';

@Component({
  selector: 'hb-shelves-list',
  templateUrl: './shelves-list.component.html',
  styleUrls: ['./shelves-list.component.less']
})
export class ShelvesListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'letter', 'number', 'noBooks'];
  dataSource!: MatTableDataSource<Shelf>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  shelves : Shelf[] = [];

  constructor(private shelveService : ShelvesService,
              private router : Router) { }

  ngOnInit(): void {
    this.loadShelves();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadShelves() : void{
    this.shelveService.getShelves().subscribe((shelves : Shelf[]) => {
      this.dataSource = new MatTableDataSource(shelves);
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.room.name.toLowerCase().includes(filter);
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToShelfDetails(shelf : Shelf) {
    this.router.navigate(['/settings/shelves', shelf.id]);
  }

  goToNewShelves() {
    this.router.navigate(['addShelves']);
  }
}
