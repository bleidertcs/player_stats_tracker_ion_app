import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePlayersPageRoutingModule } from './table-players-routing.module';

import { TablePlayersPage } from './table-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablePlayersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TablePlayersPage]
})
export class TablePlayersPageModule {}
