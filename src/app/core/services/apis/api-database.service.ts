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
export class ApiDatabaseService {

  constructor(private http: HttpClient) {}

  getRiverJson(params = {}): Observable < any > {
    return this.http.get(`/assets/mock/data-manager/vector_river.json`, {
      params: untils().InitParams(params)
    });
  }

  getRReservoirJson(params = {}): Observable < any > {
    return this.http.get(`/assets/mock/data-manager/vector_reservoir.json`, {
      params: untils().InitParams(params)
    });
  }

  getStationJson(params = {}): Observable < any > {
    return this.http.get(`/assets/mock/data-manager/vector_station.json`, {
      params: untils().InitParams(params)
    });
  }

  getModelJson(params = {}): Observable < any > {
    return this.http.get(`/assets/mock/data-manager/model_tileset.json`, {
      params: untils().InitParams(params)
    });
  }
}
