import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Database from '../models/database';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uri = 'http://localhost:4000/file-upload';

  constructor(private http: HttpClient) { }

  public getHeaders(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.uri}/headers`, formData);
  }

  public saveDatabase(obj: Database, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);   

    const blobObj = new Blob([JSON.stringify(obj)], {
      type: 'application/json',
    });

    formData.append('obj', blobObj)

    return this.http.post(`${this.uri}/save`, formData);
  }
}
