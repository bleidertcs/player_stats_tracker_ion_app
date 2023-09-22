import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablePlayersPage } from './table-players.page';

const routes: Routes = [
  {
    path: '',
    component: TablePlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePlayersPageRoutingModule {}
