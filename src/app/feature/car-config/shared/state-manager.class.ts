import { BehaviorSubject, Observable } from "rxjs";

export class StateManager<T> {
    private stateSubject$: BehaviorSubject<T | null>;
    private validitySubject$: BehaviorSubject<boolean>;
  
    constructor() {
      this.stateSubject$ = new BehaviorSubject<T | null>(null);
      this.validitySubject$ = new BehaviorSubject<boolean>(false);
    }
  
    setState(state: T | null): void {
      this.stateSubject$.next(state);
    }
  
    getState(): T | null {
      return this.stateSubject$.getValue();
    }
  
    getState$(): Observable<T | null> {
      return this.stateSubject$;
    }
  
    setValidity(isValid: boolean): void {
      this.validitySubject$.next(isValid);
    }
  
    getValidity$(): Observable<boolean> {
      return this.validitySubject$;
    }
}
