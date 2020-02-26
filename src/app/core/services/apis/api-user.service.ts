import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import untils from '../../common/untils';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) {}

  getJson(params = {}): Observable < any > {
    return this.http.get(`/assets/mock/data_temp.json`, {
      params: untils().InitParams(params)
    });
  }

  get(params = {}): Observable < any > {
    return this.http.get(`${environment.serviceRoot}/station`, {
      params: untils().InitParams(params)
    });
  }

  // 修改
  post(params): Observable < any > {
    return this.http.post(`${environment.serviceRoot}/station`, untils().InitParams(params));
  }

  // 新增
  put(params): Observable < any > {
    return this.http.put(`${environment.serviceRoot}/station`, untils().InitParams(params));
  }

  // 批量删除
  del(ids): Observable < any > {
    const params = {
      F_StationId: ids
    };
    return this.http.delete(`${environment.serviceRoot}/station`, {
      params
    });
  }

}
