import {NgModule}                                                               from '@angular/core';
import {CommonModule}                                                           from '@angular/common';
import {FormsModule, ReactiveFormsModule}                                       from '@angular/forms';
import {IonicModule}                                                            from '@ionic/angular';
import {FormModalPage}                                                          from './form-modal.page';
import {ComponentsModule}                                                       from '../../components/components.module';
import {PipesModule}                                                            from '../../pipes/pipes.module';
import { TuiFieldErrorModule, TuiInputModule }                                                   from '@taiga-ui/kit';
import { TuiButtonModule, TuiHintControllerModule, TuiRootModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiMobileCalendarModule }                                                               from '@taiga-ui/addon-mobile';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComponentsModule,
		ReactiveFormsModule,
		PipesModule,
		TuiInputModule,
		TuiFieldErrorModule,
		TuiTextfieldControllerModule,
		TuiHintControllerModule,
		TuiRootModule,
		TuiMobileCalendarModule,
		TuiButtonModule,
	],
	declarations: [FormModalPage]
})
export class FormModalPageModule {
}
