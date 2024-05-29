import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.model';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../shared/color.model';
import { Step1Form } from '../shared/step-1-form.model';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
    protected readonly baseImageUrl: string = 'https://interstate21.com/tesla-app/images/';
    protected vehicles$!: Observable<VehicleModel[]>;
    protected step1Form!: FormGroup<Step1Form>;

    constructor(private teslaService: TeslaService) {
      this.step1Form = new FormGroup({
        modelSelect: new FormControl<VehicleModel | null>(null),
        colorSelect: new FormControl<Color | null>(null)
      });
    }

    ngOnInit(): void {
      this.vehicles$ = this.teslaService.fetch();
    }

    protected fetchVehicleImageUrl(): string {
      return this.baseImageUrl + this.modelSelect!.code + '/' + this.colorSelect!.code + '.jpg';
    }

    protected change(): void {
      this.step1Form.patchValue({colorSelect: this.modelSelect?.colors[0] || null});
    }

    protected get modelSelect(): VehicleModel | null  {
      return this.step1Form.get('modelSelect')?.value || null;
    }

    protected get colorSelect(): Color | null {
      return this.step1Form.get('colorSelect')?.value || null;
    }
}
