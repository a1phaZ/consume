import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodicPage } from './periodic.page';

const routes: Routes = [
  {
    path: '',
    component: PeriodicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodicPageRoutingModule {}
