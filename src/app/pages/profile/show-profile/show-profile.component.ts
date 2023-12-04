import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss'],
})
export class ShowProfileComponent {

  public profile:any;
  constructor(private userApi:UserApiService, private router: Router) { 
    
  }

  ionViewWillEnter(){
    this.getProfile();
    
  }

  editProfile(){ 
    this.router.navigateByUrl('/profile/edit',{ state: { profile: this.profile } });
  }

  getProfile(){
    this.userApi.getProfile().subscribe(resp=>{
      if(resp){
        this.profile = resp;
      }
    }, (error) => {
      let temp = localStorage.getItem("profile");
      let tempuser = localStorage.getItem("user");
      if(temp){

        let temp2  = JSON.parse(temp)
        let tempUser  = JSON.parse(tempuser!);
        temp2.photoFacial = tempUser.photoFacial;
        this.profile = temp2;
      }else{
        if(tempuser){

          let temp2  = JSON.parse(tempuser);
          this.profile = temp2;
        }
      }
           

    });
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('auth/login');
  }

}
