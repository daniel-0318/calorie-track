import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  header = new HttpHeaders(
    {
      'Content-Type': 'application/json',
    });

  constructor(private http: HttpClient) { }

  createUser(userData: any) {
    return this.http.post(`${environment.url}/api/register`, userData);
  }
}
