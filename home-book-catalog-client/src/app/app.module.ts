import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsService } from './authors/authors.service';
import { AuthorsModule } from './authors/authors.module';
import { CoreModule } from './core-module/core.module';
import { AuthorsRoutingModule } from './authors/authors-routing.module';
import { PublishersModule } from './publishers/publishers.module';
import { PublishersRoutingModule } from './publishers/publishers-routing.module';
import { PublishersService } from './publishers/publishers.service';
import { SettingsModule } from './settings/settings.module';
import { RoomsRoutingModule } from './settings/rooms/rooms-routing.module';
import { StatusTypesRoutingModule } from './settings/status-types/status-types-routing.module';
import { ShelvesRoutingModule } from './settings/shelves/shelves-routing.module';
import { BookRoutingModule } from './books/book-routing.module';
import { BooksModule } from './books/books.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModule } from './test/test.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthorsModule,
    CoreModule,
    AuthorsRoutingModule,
    PublishersModule,
    PublishersRoutingModule,
    SettingsModule, 
    RoomsRoutingModule,
    StatusTypesRoutingModule,
    ShelvesRoutingModule,
    BookRoutingModule,
    BooksModule,
    BrowserAnimationsModule,
    TestModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    AuthorsService,
    PublishersService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
