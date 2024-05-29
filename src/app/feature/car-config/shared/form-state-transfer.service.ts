import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { ModelAndColor } from './model-and-color.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateTransferService {

  readonly modelAndColor$: BehaviorSubject<ModelAndColor | null> = new BehaviorSubject<ModelAndColor | null>(this.getModelAndColor());

  constructor() { }

  setModelAndColor(modelAndColor: ModelAndColor | null): void {
    if (!modelAndColor) {
      sessionStorage.removeItem('step1');
      this.modelAndColor$.next(modelAndColor);
      return;
    }
    sessionStorage.setItem('step1', JSON.stringify(modelAndColor));
    this.modelAndColor$.next(modelAndColor);
  }

  getModelAndColor(): ModelAndColor | null {
    let modelAndColorAsString: string | null = sessionStorage.getItem('step1');
    if (!modelAndColorAsString) {
      return null;
    }
    return (JSON.parse(modelAndColorAsString) as ModelAndColor);
  }
}
