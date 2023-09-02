import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInformationPageRoutingModule } from './user-information-routing.module';

import { UserInformationPage } from './user-information.page';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserInformationPageRoutingModule,
    TranslateModule,
    HttpClientModule,
  ],
  declarations: [UserInformationPage]
})
export class UserInformationPageModule { }
