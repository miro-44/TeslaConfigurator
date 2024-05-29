import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelCode, VehicleModel } from './vehicle-model.type';
import { Config } from './config.type';
import { VehicleSetup } from './vehicle-setup.type';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  constructor(private httpClient: HttpClient) { }

  fetchModels(): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>('/models');
  }

  fetchConfigs(model: ModelCode): Observable<VehicleSetup> {
    return this.httpClient.get<VehicleSetup>('/options/' + model);
  }
}
