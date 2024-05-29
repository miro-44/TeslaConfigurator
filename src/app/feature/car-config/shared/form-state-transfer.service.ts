import { Injectable } from '@angular/core';
import { VehicleModel } from './vehicle-model.model';
import { ModelAndColor } from './model-and-color.model';

@Injectable({
  providedIn: 'root'
})
export class FormStateTransferService {

  constructor() { }

  setModelAndColor(data: ModelAndColor): void {
    sessionStorage.setItem("step1", JSON.stringify(data));
  }

  getModel(): VehicleModel | null {
    let modelAndColorAsString: string | null = sessionStorage.getItem('step1');
    if (!modelAndColorAsString) {
      return null;
    }
    return (JSON.parse(modelAndColorAsString) as ModelAndColor).model;
  }
}
