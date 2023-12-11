import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
import { ValidatorsService } from '../../../services/validators.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public myForm: FormGroup;
  public showPassword:boolean = false;
  

  constructor(private router: Router, private userApi:UserApiService, 
    private formBuilder: FormBuilder, private validatorsService:ValidatorsService, private alertsService:AlertsService) { 

    this.myForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(){

    if(this.myForm.valid){

      let credentials = this.myForm.value;
      credentials.name = 'app';
      console.log("creden", credentials);
      this.userApi.login(credentials).subscribe((resp:any) => {
        
        if(resp['message'] === 'Sucess'){
          localStorage.setItem('token',resp['token'])
          this.router.navigate(['/'])
        }
        
      }, (error) => {
        if(error.status == 401){
          this.alertsService.presentAlert("Error al iniciar sesión", "Usuario o contraseña incorrectos");
          
        }else if(error.status == 0){
          
          let local = localStorage.getItem('user');
          let user = JSON.parse(local!);
          if(user?.email === credentials.email && user.password === credentials.password){
            localStorage.setItem('token', 'faketoken');
            this.router.navigateByUrl("/");
          }
  
        }
      });
    }else {
      this.myForm.markAllAsTouched();
    }
    
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }

  public isValidField(field:string){
    this.validatorsService.isValidField(this.myForm, field);
  }

}
