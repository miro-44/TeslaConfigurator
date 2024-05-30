import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Config } from '../shared/config.type';
import { TeslaService } from '../shared/tesla.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { VehicleOptions } from '../shared/vehicle-options.type';
import { UsdPipe } from '../shared/usd.pipe';
import { AutoUnsubAdapter } from '../shared/auto-unsub-adapter';
import { VehicleSpecsComponent } from '../vehicle-specs/vehicle-specs.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, UsdPipe, VehicleSpecsComponent],
  providers: [CurrencyPipe],
  templateUrl: './step-2.component.html'
})
export class Step2Component extends AutoUnsubAdapter implements OnInit {
  protected vehicleOptions?: VehicleOptions;
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
    this.retrieveFormOptions();
    let previousVehicleSetup = this.formStateTransferService.configAndExtrasState.data;
    this.step2FormGroup = new FormGroup({
      configSelect: new FormControl<Config | null>(previousVehicleSetup?.config || null, [Validators.required]),
      includeTowHitch: new FormControl<boolean>(previousVehicleSetup?.towHitch || false, {nonNullable: true}),
      includeYoke: new FormControl<boolean>(previousVehicleSetup?.yoke || false, {nonNullable: true})
    });
    this.subs.add(
      this.step2FormGroup.valueChanges
        .subscribe(() => this.updateState())
    );
  }

  protected get configSelect(): Config | null {
    return this.step2FormGroup.controls.configSelect.value;
  }

  protected selectCompareFn(selected: Config | null, option: Config): boolean {
    return (selected && option) ? (selected.id === option.id) : (selected === option);
  }

  private updateState(): void {
    this.formStateTransferService.configAndExtrasState = {
      data: {
        config: this.configSelect!,
        towHitch: this.step2FormGroup.controls.includeTowHitch.value,
        yoke: this.step2FormGroup.controls.includeYoke.value
      },
      valid: this.step2FormGroup.valid
    };
  }

  private retrieveFormOptions(): void {
    this.subs.add(
      this.teslaService.fetchConfigs(this.formStateTransferService.modelAndColorState.data!.model.code)
        .subscribe(vehicleOptions => this.vehicleOptions = vehicleOptions)
    );
  }

}
