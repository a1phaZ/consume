import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { DateFormatPipe } from './date-format.pipe';
import { CurrencyPipe }   from './currency.pipe';
import { ValuePipe } from './value.pipe';



@NgModule({
  declarations: [DateFormatPipe, CurrencyPipe, ValuePipe],
  imports: [
    CommonModule
  ],
  exports: [DateFormatPipe, CurrencyPipe, ValuePipe]
})
export class PipesModule { }
