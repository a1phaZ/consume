import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WrapperPageRoutingModule } from './wrapper-routing.module';

import { WrapperPage }         from './wrapper.page';
import { CustomIconComponent } from '../../components/custom-icon/custom-icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WrapperPageRoutingModule
  ],
	declarations: [WrapperPage, CustomIconComponent]
})
export class WrapperPageModule {}
