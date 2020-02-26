import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiRiverService {


  constructor(private http: HttpClient) {}

  get(): Observable < any > {
    return this.http.get(`/assets/mock/data_real_river.json`);
  }

}
