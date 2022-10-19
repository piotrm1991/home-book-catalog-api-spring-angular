import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomResolve } from './room-resolve.service';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { RoomAddComponent } from './room-add/room-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    RoomsListComponent,
    RoomDetailsComponent,
    RoomAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [
    RoomsListComponent,
    RoomDetailsComponent
  ],
  providers: [
    RoomResolve
  ]
})
export class RoomsModule { }
