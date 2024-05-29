import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../shared/tesla.service';
import { VehicleModel } from '../shared/vehicle-model.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
    vehicles!: Observable<VehicleModel[]>;
    selectedVehicle?: VehicleModel;

    constructor(private teslaService: TeslaService) {}

    ngOnInit(): void {
      this.vehicles = this.teslaService.fetch();
    }

    selectVehicle(selectedVehicle: VehicleModel): void {
      console.log("Selected: " + this.selectedVehicle);
      this.selectedVehicle = selectedVehicle;
    }
}
