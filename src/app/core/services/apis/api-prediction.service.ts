import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import untils from '../../common/untils';

@Injectable({
  providedIn: 'root'
})
export class ApiPredictionService {

  constructor(private http: HttpClient) {}
  getJson(params = {}): Observable < any > {
    return this.http.get(`/assets/mock/data_prediction.json`, {
      params: untils().InitParams(params)
    });
  }

}
