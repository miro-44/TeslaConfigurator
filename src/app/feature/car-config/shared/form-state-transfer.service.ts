import { Injectable } from '@angular/core';
import { VehicleModel } from './vehicle-model.type';
import { ModelAndColor } from './model-and-color.type';

@Injectable({
  providedIn: 'root'
})
export class FormStateTransferService {

  constructor() { }

  setModelAndColor(data: ModelAndColor | null): void {
    if (!data) {
      sessionStorage.removeItem('step1');
      return;
    }
    sessionStorage.setItem('step1', JSON.stringify(data));
  }

  getModelAndColor(): ModelAndColor | null {
    let modelAndColorAsString: string | null = sessionStorage.getItem('step1');
    if (!modelAndColorAsString) {
      return null;
    }
    return (JSON.parse(modelAndColorAsString) as ModelAndColor);
  }
}
