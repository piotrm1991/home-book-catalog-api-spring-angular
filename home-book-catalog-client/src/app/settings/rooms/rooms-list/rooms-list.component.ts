import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/rooms';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'hb-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.less']
})
export class RoomsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'noBooks', 'noShelves'];
  dataSource!: MatTableDataSource<Room>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rooms : Room[] = [];

  constructor(private roomService : RoomsService,
              private router : Router) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadRooms() : void{
    this.roomService.getRooms().subscribe((rooms : Room[]) => {
      this.dataSource = new MatTableDataSource(rooms);
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter);
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToRoomDetails(room : Room) {
    this.router.navigate(['/settings/rooms', room.id]);
  }

  goToNewRoom() {
    this.router.navigate(['addRoom']);
  }

}
