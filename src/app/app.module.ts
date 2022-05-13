import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent }                                  from './app.component';
import { AppRoutingModule }                              from './app-routing.module';
import { ComponentsModule }                              from './components/components.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService }                                  from './services/modal.service';
import { PopoverService }                                from './services/popover.service';
import { HttpClientModule }                              from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, FormBuilder, ModalService, PopoverService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
