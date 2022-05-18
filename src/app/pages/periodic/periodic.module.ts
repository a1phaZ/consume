import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeriodicPageRoutingModule } from './periodic-routing.module';

import { PeriodicPage }   from './periodic.page';
import { HomePageModule } from '../home/home.module';
import { TuiRootModule }  from '@taiga-ui/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PeriodicPageRoutingModule,
		HomePageModule,
		TuiRootModule
	],
  declarations: [PeriodicPage]
})
export class PeriodicPageModule {}
