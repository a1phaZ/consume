import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule }                      from '@ionic/angular';
import { FormModalPage }                    from './form-modal.page';
import { ComponentsModule }                 from '../../components/components.module';
import { PipesModule }                      from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [FormModalPage]
})
export class FormModalPageModule {}
