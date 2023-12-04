import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private userApi:UserApiService) { }

  onLogin(){

    const credentials = {
      email: this.email,
      password: this.password,
      name: "app"
    };

    this.userApi.login(credentials).subscribe((resp:any) => {
      
      if(resp['message'] === 'Sucess'){
        localStorage.setItem('token',resp['token'])
        this.router.navigate(['/'])

      }
      
    }, (error) => {

      console.error('Error en la autenticación:', error);
    });
    
  }

}
