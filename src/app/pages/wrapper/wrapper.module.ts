import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WrapperPageRoutingModule } from './wrapper-routing.module';

import { WrapperPage }      from './wrapper.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WrapperPageRoutingModule,
    ComponentsModule
  ],
	declarations: [WrapperPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WrapperPageModule {}
