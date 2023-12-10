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

  public getHeader(){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return headers;
  }

  public createUser(userData: any) {
    return this.http.post(`${environment.url}/user`, userData,{headers:this.header});
  }

  public updateUser(userData: any){
    return this.http.put(`${environment.url}/user/update`, userData,{headers:this.getHeader()});
  }

  public login(userData: any){
    return this.http.post(`${environment.url}/login`, userData);
  }

  public getProfile(){

    return this.http.get(`${environment.url}/user/show`,{headers:this.getHeader()});
  }

  public getCaloriesTracks(page:number){
    return this.http.get(`${environment.url}/v1/calories?page=${page}`,{headers:this.getHeader()});
  }

  public searchCaloriesTracks(data:any){
    return this.http.post(`${environment.url}/v1/calories/search`,data,{headers:this.getHeader()});
  }

  public createCalorieTrack(data:any){
    return this.http.post(`${environment.url}/v1/calories`,data,{headers:this.getHeader()});
  }

  public updateCalorieTrack(data: any, id:number){
    return this.http.put(`${environment.url}/v1/calories/${id}`, data,{headers:this.getHeader()});
  }

  public deleteCalorieTrack(id:number){
    return this.http.delete(`${environment.url}/v1/calories/${id}`,{headers:this.getHeader()});
  }

  public isAuthenticated(){
    let token = localStorage.getItem('token');
    if(token){
      return true
    }else{
      return false;
    }
  }

  public changePassword(current_password:string, password:string){

    let data = {
      current_password, password
    };
    return this.http.put(`${environment.url}/user/updatePassword`, data,{headers:this.getHeader()});
    
  }
}
