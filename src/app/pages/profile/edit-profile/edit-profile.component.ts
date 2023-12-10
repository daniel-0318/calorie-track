import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {

  profileform: FormGroup;
  profile: any;

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService,
    public photoService: PhotoService, private userApi: UserApiService,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.profile = navigation.extras["state"]["profile"];
    }
    

    this.profileform = this.fb.group({
      name: [this.profile.name, Validators.required],
      lastname: [this.profile.lastname, Validators.required],
      identificationType: [this.profile.identificationType, Validators.required],
      identificationNumber: [this.profile.identificationNumber, Validators.required],
      gender: [this.profile.gender, Validators.required],
      phone: [this.profile.phone, [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }


  idValidField(field: string) {
    return this.validatorsService.isValidField(this.profileform, field);
  }

  addPhotoToGallery(campo: string) {
    let imageb64 = this.photoService.takephoto().then(resp => {
      console.log(resp);
      this.profileform.get(campo)?.setValue(resp);
    }
    );
  }

  onSubmit() {
    if (this.profileform.valid) {
      const formData = this.profileform.value;
      this.userApi.updateUser(formData).subscribe((resp:any) => {
        console.log("actualizacion", resp);
        if(resp && resp?.message==='Sucess'){
          this.router.navigateByUrl('/profile/show');
        }
      }, error => {
        let temp = JSON.stringify(formData);
        localStorage.setItem("profile", temp);
        this.router.navigateByUrl('/profile/show');
      });
      
    } else {
      this.profileform.markAllAsTouched();
    }
  }

}
