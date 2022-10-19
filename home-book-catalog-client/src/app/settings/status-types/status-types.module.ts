import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTypesListComponent } from './status-types-list/status-types-list.component';
import { StatusTypeDetailsComponent } from './status-type-details/status-type-details.component';
import { StatusTypeAddComponent } from './status-type-add/status-type-add.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { StatusTypeResolve } from './status-type-resolve.service';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    StatusTypesListComponent,
    StatusTypeDetailsComponent,
    StatusTypeAddComponent
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
  exports: [
    StatusTypesListComponent,
    StatusTypeDetailsComponent
  ],
  providers: [
    StatusTypeResolve
  ]
})
export class StatusTypesModule { }
