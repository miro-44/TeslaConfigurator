import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObjAsFormControls } from '../shared/obj-as-form-controls.type';
import { Config } from '../shared/config.type';
import { TeslaService } from '../shared/tesla.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormStateTransferService } from '../shared/form-state-transfer.service';
import { VehicleOptions } from '../shared/vehicle-options.type';
import { VehicleSetup } from '../shared/vehicle-setup.type';


@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit {
  protected vehicleOptions$!: Observable<VehicleOptions>;
  protected step2FormGroup!: FormGroup<ObjAsFormControls<VehicleSetup>>;

  constructor(private teslaService: TeslaService, private formStateTransferService: FormStateTransferService) {}

  ngOnInit(): void {
    this.step2FormGroup = new FormGroup({
      configSelect: new FormControl<Config | null>(null)
    });
    this.vehicleOptions$ = this.teslaService.fetchConfigs(this.formStateTransferService.getModelAndColor()!.model.code);
  }

  protected get configSelect(): Config | null {
    return this.step2FormGroup.controls.configSelect.value;
  }
}
