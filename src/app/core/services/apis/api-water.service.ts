import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWaterService {

  constructor(private http: HttpClient) {}

  get(): Observable < any > {
    return this.http.get(`/assets/mock/data_real_water.json`);
  }

}
