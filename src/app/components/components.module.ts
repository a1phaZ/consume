import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { PopoverComponent }                 from './popover/popover.component';
import { IonicModule }                      from '@ionic/angular';
import { CustomIconComponent }                                     from './custom-icon/custom-icon.component';
import { InputComponent }                                                                from './input/input.component';
import { FormsModule, ReactiveFormsModule }                                              from '@angular/forms';
import {DateFieldComponent}                                                              from './date-field/date-field.component';
import {
	TuiDataListWrapperModule,
	TuiFieldErrorModule,
	TuiInputDateModule,
	TuiInputModule,
	TuiInputNumberModule,
	TuiSelectModule
} from '@taiga-ui/kit';
import {
	TuiButtonModule, TuiDataListModule,
	TuiDialogModule,
	TuiHintControllerModule, TuiRootModule,
	TuiTextfieldControllerModule
}                                                                 from '@taiga-ui/core';
import { TuiMobileCalendarDialogModule, TuiMobileCalendarModule } from '@taiga-ui/addon-mobile';
import {
	TuiCurrencyPipeModule
}                                                                 from '@taiga-ui/addon-commerce';
import {
	SelectFieldComponent
}                                                                 from './select-field/select-field.component';
import { TuiLetModule }                                           from '@taiga-ui/cdk';


@NgModule({
  declarations: [PopoverComponent, CustomIconComponent, InputComponent, DateFieldComponent, SelectFieldComponent],
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
		TuiSelectModule,
		TuiDataListWrapperModule,
		TuiDataListModule,
		TuiLetModule,
	],
  exports: [PopoverComponent, CustomIconComponent, InputComponent, DateFieldComponent, SelectFieldComponent]
})
export class ComponentsModule { }
