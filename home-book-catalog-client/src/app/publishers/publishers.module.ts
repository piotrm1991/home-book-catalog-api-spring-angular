import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishersListComponent } from './publishers-list/publishers-list.component';
import { PublisherAddComponent } from './publisher-add/publisher-add.component';
import { PublisherDetailsComponent } from './publisher-details/publisher-details.component';
import { SharedModule } from '../shared-module/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PublisherResolve } from './publisher-resolve.service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    PublishersListComponent,
    PublisherAddComponent,
    PublisherDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule
  ],
  exports: [
    PublishersListComponent
  ],
  providers: [
    PublisherResolve
  ]
})
export class PublishersModule { }
