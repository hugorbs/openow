import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import API from '../models/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uri = 'http://localhost:4000/apis';

  constructor(private http: HttpClient) { }

  addAPI(obj: API): Observable<any> {
    return this.http.post(`${this.uri}/add`, obj);
  }

  getAPIs() {
    return this
           .http
           .get(`${this.uri}`);
  }

  deleteAPI(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }
}
