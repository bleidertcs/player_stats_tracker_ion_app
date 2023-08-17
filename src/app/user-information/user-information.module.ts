import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInformationPageRoutingModule } from './user-information-routing.module';

import { UserInformationPage } from './user-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserInformationPageRoutingModule
  ],
  declarations: [UserInformationPage]
})
export class UserInformationPageModule { }
