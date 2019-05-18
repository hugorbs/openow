import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Database from '../models/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  uri = 'http://localhost:4000/databases';

  constructor(private http: HttpClient) { }

  addDatabase(obj: Database): Observable<any> {
    return this.http.post(`${this.uri}/add`, obj);
  }

  getDatabases() {
    return this
           .http
           .get(`${this.uri}`);
  }

  deleteDatabase(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }
}
