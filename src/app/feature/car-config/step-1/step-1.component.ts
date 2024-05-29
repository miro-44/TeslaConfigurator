import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../shared/color.model';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
    vehicles!: Observable<VehicleModel[]>;
    step1Form!: FormGroup;
    modelSelect: FormControl<VehicleModel | null> = new FormControl(null);
    colorSelect: FormControl<Color | null> = new FormControl(null);

    constructor(private teslaService: TeslaService) {
      this.step1Form = new FormGroup({
        modelSelect: this.modelSelect,
        colorSelect: this.colorSelect
      });
    }

    ngOnInit(): void {
      this.vehicles = this.teslaService.fetch();
    }

}
