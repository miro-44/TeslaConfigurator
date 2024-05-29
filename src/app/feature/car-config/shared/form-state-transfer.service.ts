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

  configAndExtras: ConfigAndExtras | null = null;

  set modelAndColor(modelAndColor: ModelAndColor | null) {
    this.modelAndColor$.next(modelAndColor);
  }

  get modelAndColor(): ModelAndColor | null {
    return this.modelAndColor$.getValue();
  }

  subscribeToModelAndColor(subscriber: (value: ModelAndColor | null) => void): Subscription {
    return this.modelAndColor$.subscribe(subscriber);
  }

}
