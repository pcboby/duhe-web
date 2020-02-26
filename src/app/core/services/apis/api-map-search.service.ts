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
export class ApiMapSearchService {


  constructor(private http: HttpClient) {}

  get(params = {}): Observable < any > {
    return this.http.get(`/assets/mock/data-map-search.json`, {
      params: untils().InitParams(params)
    });
  }

}
