import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from 'src/app/services/photo.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent{

  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder,  private validatorsService:ValidatorsService, public photoService: PhotoService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      identityType: ['', Validators.required],
      identityNumber: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
      cedulaFrontal: [''],
      cedulaReverso: [''],
      facialPhoto: ['']
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

    this.registerForm.get(campo)?.setValue(this.photoService.takephoto());
    
  }


   onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Aquí puedes enviar los datos o realizar otras operaciones con ellos
    } else {
      // Marcar los campos como tocados para mostrar errores si el formulario no es válido
      this.registerForm.markAllAsTouched();
    }
  }

}
