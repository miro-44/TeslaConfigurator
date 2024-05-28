import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from './vehicle-model.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  constructor(private httpClient: HttpClient) { }

  fetch(): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>('/models');
  }
}
