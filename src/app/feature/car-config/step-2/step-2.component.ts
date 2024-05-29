import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Config } from '../shared/config.type';
import { TeslaService } from '../shared/tesla.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { VehicleOptions } from '../shared/vehicle-options.type';
import { UsdPipe } from '../shared/usd.pipe';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, UsdPipe],
  providers: [CurrencyPipe],
  templateUrl: './step-2.component.html'
})
export class Step2Component implements OnInit {
  protected vehicleOptions$!: Observable<VehicleOptions>;
  protected step2FormGroup!: FormGroup<{
    configSelect: FormControl<Config | null>,
    includeTowHitch: FormControl<boolean>,
    includeYoke: FormControl<boolean>
  }>;

  constructor(private teslaService: TeslaService, private formStateTransferService: FormStateTransferService) {}

  ngOnInit(): void {
    this.step2FormGroup = new FormGroup({
      configSelect: new FormControl<Config | null>(null),
      includeTowHitch: new FormControl<boolean>(false, {nonNullable: true}),
      includeYoke: new FormControl<boolean>(false, {nonNullable: true})
    });
    this.vehicleOptions$ = this.teslaService.fetchConfigs(this.formStateTransferService.getModelAndColor()!.model.code);
  }

  protected get configSelect(): Config | null {
    return this.step2FormGroup.controls.configSelect.value;
  }
}
