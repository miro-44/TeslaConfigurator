import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usd',
  standalone: true
})
export class UsdPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: string | number): string | null {
    return this.currencyPipe.transform(value, 'USD');
  }

}
