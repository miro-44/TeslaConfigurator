import { Injectable } from '@angular/core';
import { ModelAndColor } from './model-and-color.type';
import { BehaviorSubject } from 'rxjs';
import { ConfigAndExtras } from './config-and-extras.type';

@Injectable({
  providedIn: 'root'
})
export class FormStateTransferService {

  readonly modelAndColor$: BehaviorSubject<ModelAndColor | null> = new BehaviorSubject<ModelAndColor | null>(this.getModelAndColor());

  constructor() { }

  setModelAndColor(modelAndColor: ModelAndColor | null): void {
    if (!modelAndColor) {
      sessionStorage.removeItem('step1');
      this.modelAndColor$.next(null);
      return;
    }
    sessionStorage.setItem('step1', JSON.stringify(modelAndColor));
    this.modelAndColor$.next(modelAndColor);
  }

  getModelAndColor(): ModelAndColor | null {
    return this.retrieveItem<ModelAndColor>('step1');
  }

  setConfigAndExtras(configAndExtras: ConfigAndExtras | null): void {
    if (!configAndExtras) {
      sessionStorage.removeItem('step2');
      return;
    }
    sessionStorage.setItem('step2', JSON.stringify(configAndExtras));
  }

  getConfigAndExtras(): ConfigAndExtras | null {
    return this.retrieveItem<ConfigAndExtras>('step2');
  }

  private retrieveItem<T>(key: string): T | null {
    const itemAsString: string | null = sessionStorage.getItem(key);
    if (!itemAsString) {
      return null;
    }
    return JSON.parse(itemAsString) as T;
  }
}
