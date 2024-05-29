import { Injectable } from '@angular/core';
import { ModelAndColor } from './model-and-color.type';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ConfigAndExtras } from './config-and-extras.type';

@Injectable({
  providedIn: 'root'
})
export class FormStateTransferService {

  private readonly modelAndColor$: BehaviorSubject<ModelAndColor | null> = new BehaviorSubject<ModelAndColor | null>(null);

  constructor() { }

  set modelAndColor(modelAndColor: ModelAndColor | null) {
    this.modelAndColor$.next(modelAndColor);
  }

  get modelAndColor(): ModelAndColor | null {
    return this.modelAndColor$.getValue();
  }

  subscribeToModelAndColor(subscriber: (value: ModelAndColor | null) => void): Subscription {
    return this.modelAndColor$.subscribe(subscriber);
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
