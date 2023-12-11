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
  showPassword:boolean = false;
  showPassowordConfirm:boolean = false;
  
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
      address: ['', Validators.required],
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

  public idValidField(field:string){
    return this.validatorsService.isValidField(this.registerForm, field);
  }

  addPhotoToGallery(campo:string) {
    this.photoService.takephoto().then(resp =>{
      this.registerForm.get(campo)?.setValue(resp);
    }
    );
    
  }


  public onSubmit() {
    if (this.registerForm.valid) {
      const formData = {...this.registerForm.value};
      delete formData.password2;
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



  getImage(type:string){
    const image = this.registerForm.get(type)?.value;
    if(image != ""){
      return image;
    }else if(type == "photoFacial"){
      return '/assets/img/user.png';
    }else{
      return '/assets/img/dni.png';
    }
  }

  toggleShowPassword(field:string){
    if(field == "password"){
      this.showPassword = !this.showPassword;
    }else if(field == "passwordConfirm"){
      this.showPassowordConfirm = !this.showPassowordConfirm;
    }
  }

  changeAddress(event:any){
    
    this.registerForm.get('address')?.setValue(event);
  }

}
