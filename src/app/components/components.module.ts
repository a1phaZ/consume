import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { PopoverComponent }    from './popover/popover.component';
import { IonicModule }         from '@ionic/angular';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { InputComponent }                   from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PopoverComponent, CustomIconComponent, InputComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [PopoverComponent, CustomIconComponent, InputComponent]
})
export class ComponentsModule { }
