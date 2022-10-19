import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsShowComponent } from './settings-show/settings-show.component';
import { RoomsModule } from './rooms/rooms.module';
import { SharedModule } from '../shared-module/shared.module';
import { RouterModule } from '@angular/router';
import { StatusTypesModule } from './status-types/status-types.module';
import { ShelvesModule } from './shelves/shelves.module';

@NgModule({
  declarations: [
    SettingsShowComponent
  ],
  imports: [
    CommonModule,
    RoomsModule,
    SharedModule,
    RouterModule,
    StatusTypesModule,
    ShelvesModule
  ]
})
export class SettingsModule { }
