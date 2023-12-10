import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../services/user-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-passowrd',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePassowrdComponent {

  myForm: FormGroup;

  showCurrentPassword = false;
  showNewPassword = false;
  showNewPassword2 = false;

  constructor(private userApi:UserApiService, 
    private fb:FormBuilder, 
    private validatorsService:ValidatorsService, 
    private toastController:ToastController) { 

    this.myForm = this.fb.group({
      current_password: ['', [Validators.required,Validators.min(6)]],
      password: ['', [Validators.required, Validators.min(6)]],
      password2: ['', [Validators.required,Validators.min(6)]],
    },{
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
      ]
    } );

  }

  public idValidField(field:string){
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.userApi.changePassword( this.myForm.value.current_password, this.myForm.value.password ).subscribe((resp:any)=>{
        if(resp && resp.message){
          this.presentToast("Contraseña actualizada con éxito");
        }
        
      }, error => {
        if(error.status == 0){
          // local
        }else if(error.status == 401){
          this.presentToast("La contraseña actual no coincide");
        }
        
      });
    } else {
      this.myForm.markAllAsTouched();
    }

  }

  toggleShowPassword(field: string) {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'new2') {
      this.showNewPassword2 = !this.showNewPassword2;
    }
  }


  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500
    });
    toast.present();
  }


}
