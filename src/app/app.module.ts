import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe } from './pipes/currency.pipe';

@NgModule({
	declarations: [AppComponent, CurrencyPipe],
	entryComponents: [],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
	providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
	bootstrap: [AppComponent],
})
export class AppModule {}
