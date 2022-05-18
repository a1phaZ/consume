import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { PopoverComponent }                 from './popover/popover.component';
import { IonicModule }                      from '@ionic/angular';
import { CustomIconComponent }                                     from './custom-icon/custom-icon.component';
import { InputComponent }                                                                from './input/input.component';
import { FormsModule, ReactiveFormsModule }                                              from '@angular/forms';
import {DateFieldComponent}                                                              from './date-field/date-field.component';
import { TuiFieldErrorModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiDialogModule,
	TuiHintControllerModule, TuiRootModule,
	TuiTextfieldControllerModule
}                                                                                        from '@taiga-ui/core';
import { TuiMobileCalendarDialogModule, TuiMobileCalendarModule }                        from '@taiga-ui/addon-mobile';
import {
	TuiCurrencyPipeModule
}                                                                                        from '@taiga-ui/addon-commerce';


@NgModule({
  declarations: [PopoverComponent, CustomIconComponent, InputComponent, DateFieldComponent],
	imports: [
		CommonModule,
		IonicModule,
		ReactiveFormsModule,
		FormsModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
		TuiHintControllerModule,
		TuiFieldErrorModule,
		TuiInputDateModule,
		TuiButtonModule,
		TuiMobileCalendarDialogModule,
		TuiDialogModule,
		TuiMobileCalendarModule,
		TuiRootModule,
		TuiInputNumberModule,
		TuiCurrencyPipeModule,
	],
  exports: [PopoverComponent, CustomIconComponent, InputComponent, DateFieldComponent]
})
export class ComponentsModule { }
