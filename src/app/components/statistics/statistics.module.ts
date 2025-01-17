import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule
  ],
  declarations: [StatisticsPage]
})
export class StatisticsPageModule { }
