import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { DateFormatPipe } from './date-format.pipe';
import { CurrencyPipe }   from './currency.pipe';



@NgModule({
  declarations: [DateFormatPipe, CurrencyPipe],
  imports: [
    CommonModule
  ],
  exports: [DateFormatPipe, CurrencyPipe]
})
export class PipesModule { }
