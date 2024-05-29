import { Component, Input } from '@angular/core';
import { Config } from '../shared/config.type';
import { UsdPipe } from '../shared/usd.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-specs',
  standalone: true,
  imports: [UsdPipe],
  providers: [CurrencyPipe],
  templateUrl: './vehicle-specs.component.html',
})
export class VehicleSpecsComponent {
  @Input() config?: Config;
  @Input() showCost: boolean = true;
}
