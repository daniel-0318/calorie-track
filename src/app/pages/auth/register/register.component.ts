import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent{

  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder, private validatorsService:ValidatorsService, 
    public photoService: PhotoService, private userApi:UserApiService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      identificationType: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
      photoIdFront: ['', [Validators.required]],
      photoIdBack: ['', [Validators.required]],
      photoFacial: ['', [Validators.required]]
    }, {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
      ]
    });
   }

   idValidField(field:string){
    return this.validatorsService.isValidField(this.registerForm, field);
  }

  addPhotoToGallery(campo:string) {
    let imageb64 = this.photoService.takephoto().then(resp =>{
      console.log(resp);
      this.registerForm.get(campo)?.setValue(resp);
    }
    );
    
  }


   onSubmit() {
    if (this.registerForm.valid) {
      const formData = {...this.registerForm.value};
      delete formData.password2;
      formData.geoAddress="123,123";
      this.userApi.createUser(formData).subscribe(resp => {
        this.toLogin();
      }, error => {
        console.log("no hay conexion pasamos a offline");
        const info = JSON.stringify(formData)
        localStorage.setItem("user", info);
        this.router.navigateByUrl("auth/login");
      });
      
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  
  toLogin(){
    this.router.navigate(['/auth/login'])
  }

}
