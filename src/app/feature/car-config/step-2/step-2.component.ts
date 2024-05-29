import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Config } from '../shared/config.type';
import { TeslaService } from '../shared/tesla.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { VehicleOptions } from '../shared/vehicle-options.type';
import { UsdPipe } from '../shared/usd.pipe';
import { AutoUnsubAdapter } from '../shared/auto-unsub-adapter';
import { ConfigAndExtras } from '../shared/config-and-extras.type';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, UsdPipe],
  providers: [CurrencyPipe],
  templateUrl: './step-2.component.html'
})
export class Step2Component extends AutoUnsubAdapter implements OnInit {
  protected vehicleOptions?: VehicleOptions;
  protected currentVehicleSetup?: ConfigAndExtras;
  protected step2FormGroup!: FormGroup<{
    configSelect: FormControl<Config | null>,
    includeTowHitch: FormControl<boolean>,
    includeYoke: FormControl<boolean>
  }>;

  constructor(
    private teslaService: TeslaService,
    private formStateTransferService: FormStateTransferService
  ) {
    super();
  }

  ngOnInit(): void {
    this.step2FormGroup = new FormGroup({
      configSelect: new FormControl<Config | null>(null),
      includeTowHitch: new FormControl<boolean>(false, {nonNullable: true}),
      includeYoke: new FormControl<boolean>(false, {nonNullable: true})
    });
    this.subs.add(
      this.teslaService.fetchConfigs(this.formStateTransferService.getModelAndColor()!.model.code)
        .subscribe(vehicleOptions => this.vehicleOptions = vehicleOptions)
    );
  }

  protected get configSelect(): Config | null {
    return this.step2FormGroup.controls.configSelect.value;
  }

  protected get includeTowHitch(): boolean {
    return this.step2FormGroup.controls.includeTowHitch.value;
  }

  protected get includeYoke(): boolean {
    return this.step2FormGroup.controls.includeYoke.value;
  }
}
