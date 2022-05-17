import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { PopoverComponent }    from './popover/popover.component';
import { IonicModule }         from '@ionic/angular';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { InputComponent }                   from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DateFieldComponent} from './date-field/date-field.component';


@NgModule({
  declarations: [PopoverComponent, CustomIconComponent, InputComponent, DateFieldComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [PopoverComponent, CustomIconComponent, InputComponent, DateFieldComponent]
})
export class ComponentsModule { }
