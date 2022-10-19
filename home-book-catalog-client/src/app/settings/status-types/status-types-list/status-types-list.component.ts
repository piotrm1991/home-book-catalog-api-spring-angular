import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StatusType } from 'src/app/models/status-type';
import { StatusTypesService } from '../status-types.service';

@Component({
  selector: 'hb-status-types-list',
  templateUrl: './status-types-list.component.html',
  styleUrls: ['./status-types-list.component.less']
})
export class StatusTypesListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'noBooks'];
  dataSource!: MatTableDataSource<StatusType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  statusTypes : StatusType[] = [];

  constructor(private statusTypeService : StatusTypesService,
              private router : Router) { }

  ngOnInit(): void {
    this.loadStatusTypes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadStatusTypes() : void{
    this.statusTypeService.getStatusTypes().subscribe((statusTypes : StatusType[]) => {
      this.dataSource = new MatTableDataSource(statusTypes);
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter);
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToStatusTypeDetails(statusType : StatusType) {
    this.router.navigate(['/settings/statusTypes', statusType.id]);
  }

  goToNewStatusType() {
    this.router.navigate(['addStatusType']);
  }
}
