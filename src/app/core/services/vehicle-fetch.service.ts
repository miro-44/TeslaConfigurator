import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelCode, VehicleModel } from '../../feature/steps/shared/types/vehicle-model.type';
import { VehicleOptions } from '../../feature/steps/shared/types/vehicle-options.type';

@Injectable({
  providedIn: 'root'
})
export class VehicleFetchService {

  constructor(private httpClient: HttpClient) { }

  fetchModels(): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>("/models");
  }

  fetchConfigs(model: ModelCode): Observable<VehicleOptions> {
    return this.httpClient.get<VehicleOptions>("/options/" + model);
  }
}
