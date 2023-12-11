import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
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
    public photoService: PhotoService, private userApi: UserApiService,private router: Router,
    private alertsService:AlertsService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.profile = navigation.extras["state"]["profile"];
    }
    

    this.profileform = this.fb.group({
      photoFacial: [this.profile.photoFacial, [Validators.required]],
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

  public changeProfilePhoto(){
    this.photoService.takephoto().then(resp => {
      this.profileform.get("photoFacial")?.setValue(resp);
    });
  }

  onSubmit() {
    if (this.profileform.valid) {
      const formData = this.profileform.value;
      this.userApi.updateUser(formData).subscribe((resp:any) => {
        if(resp && resp?.message==='Sucess'){
          this.alertsService.presentToast("Perfil actualizado");
          this.router.navigateByUrl('/profile/show');
        }
      }, error => {
        let temp = JSON.stringify(formData);
        localStorage.setItem("profile", temp);
        this.alertsService.presentToast("Perfil actualizado");
        this.router.navigateByUrl('/profile/show');
      });
      
    } else {
      this.profileform.markAllAsTouched();
    }
  }

  public getPhoto(photo:string){
    return this.profileform.get(photo)?.value;
  }

}
