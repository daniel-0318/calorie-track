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

  public createUser(userData: any) {
    return this.http.post(`${environment.url}/user`, userData);
  }

  public updateUser(userData: any){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return this.http.put(`${environment.url}/user/update`, userData,{headers});
  }

  public login(userData: any){
    return this.http.post(`${environment.url}/login`, userData);
  }

  public getProfile(){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.url}/user/show`,{headers});
  }

  public getCaloriesTracks(page:number){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.url}/v1/calories?page=${page}`,{headers});
  }

  public searchCaloriesTracks(data:any){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return this.http.post(`${environment.url}/v1/calories/search`,data,{headers});
  }

  public createCalorieTrack(data:any){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return this.http.post(`${environment.url}/v1/calories`,data,{headers});
  }

  public updateCalorieTrack(data: any, id:number){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return this.http.put(`${environment.url}/v1/calories/${id}`, data,{headers});
  }

  public deleteCalorieTrack(id:number){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return this.http.delete(`${environment.url}/v1/calories/${id}`,{headers});
  }
}
