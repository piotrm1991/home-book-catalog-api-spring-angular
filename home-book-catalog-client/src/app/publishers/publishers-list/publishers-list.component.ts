import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Publisher } from 'src/app/models/publisher';
import { PublishersService } from '../publishers.service';

@Component({
  selector: 'hb-publishers-list',
  templateUrl: './publishers-list.component.html',
  styleUrls: ['./publishers-list.component.less']
})
export class PublishersListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'noBooks'];
  dataSource!: MatTableDataSource<Publisher>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  publishers : Publisher[] = [];

  constructor(private publisherService : PublishersService,
              private router : Router) { }

  ngOnInit(): void {
    this.loadPublishers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadPublishers() : void{
    this.publisherService.getPublishers().subscribe(publisher => {
      this.dataSource = new MatTableDataSource(publisher);
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter);
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToPublisherDetails(publisher : Publisher) {
    this.router.navigate(['/publishers', publisher.id]);
  }

  goToNewPublisher() {
    this.router.navigate(['/addPublisher']);
  }
}
