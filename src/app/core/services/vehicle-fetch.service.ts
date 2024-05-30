import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelCode, VehicleModel } from '../../feature/steps/shared/types/vehicle-model.type';
import { AvailableConfigAndOptions } from '../../feature/steps/shared/types/available-config-and-options.type';

@Injectable({
  providedIn: 'root'
})
export class VehicleFetchService {

  constructor(private httpClient: HttpClient) { }

  fetchModels(): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>("/models");
  }

  fetchConfigs(model: ModelCode): Observable<AvailableConfigAndOptions> {
    return this.httpClient.get<AvailableConfigAndOptions>("/options/" + model);
  }
}
