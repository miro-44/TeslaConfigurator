import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelCode, VehicleModel } from './vehicle-model.type';
import { VehicleOptions } from './vehicle-options.type';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  constructor(private httpClient: HttpClient) { }

  fetchModels(): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>('/models');
  }

  fetchConfigs(model: ModelCode): Observable<VehicleOptions> {
    return this.httpClient.get<VehicleOptions>('/options/' + model);
  }
}
