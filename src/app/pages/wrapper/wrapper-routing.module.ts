import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WrapperPage } from './wrapper.page';

const routes: Routes = [
  {
    path: '',
    component: WrapperPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'periodic',
        loadChildren: () => import('../periodic/periodic.module').then(m => m.PeriodicPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WrapperPageRoutingModule {}
