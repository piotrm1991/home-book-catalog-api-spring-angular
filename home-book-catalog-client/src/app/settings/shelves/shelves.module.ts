import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { ShelvesListComponent } from './shelves-list/shelves-list.component';
import { ShelfDetailsComponent } from './shelf-details/shelf-details.component';
import { ShelfAddComponent } from './shelf-add/shelf-add.component';
import { ShelvesResolve } from './shelves-resolve.service';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ShelvesListComponent,
    ShelfDetailsComponent,
    ShelfAddComponent
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
    MatPaginatorModule,
    MatSelectModule
  ],
  exports: [
    ShelvesListComponent,
    ShelfDetailsComponent
  ],
  providers: [
    ShelvesResolve
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ShelvesModule { }
