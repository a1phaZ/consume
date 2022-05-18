import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { RouteReuseStrategy }               from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent }                                  from './app.component';
import { AppRoutingModule }                                       from './app-routing.module';
import { ComponentsModule }                                       from './components/components.module';
import { FormBuilder, FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { ModalService }                                           from './services/modal.service';
import { PopoverService }                                         from './services/popover.service';
import { HttpClientModule }                                       from '@angular/common/http';
import { StoreModule }                                            from '@ngrx/store';
import { periodicReducer }                                        from './store/periodic/reducer/periodic.reducer';
import { TuiDialogModule, TuiRootModule }                         from '@taiga-ui/core';
import { BrowserAnimationsModule }                                from '@angular/platform-browser/animations';
import { TuiMobileCalendarDialogModule, TuiMobileCalendarModule } from '@taiga-ui/addon-mobile';
import { TuiInputDateModule }                                     from '@taiga-ui/kit';
import { PolymorpheusModule }                                     from '@tinkoff/ng-polymorpheus';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		ComponentsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		StoreModule.forRoot({
			periodic: periodicReducer
		}),
		TuiRootModule,
		TuiDialogModule,
		TuiMobileCalendarModule,
		TuiMobileCalendarDialogModule,
		TuiInputDateModule,
		PolymorpheusModule
	],
	providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, FormBuilder, ModalService, PopoverService],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
