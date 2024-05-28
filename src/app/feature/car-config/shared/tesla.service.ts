import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  constructor(private httpClient: HttpClient) { }

  fetch(): Observable<string[]> {
    return this.httpClient.get<any>('/models');
  }
}
