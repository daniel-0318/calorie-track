import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss'],
})
export class ListFoodComponent {

  items:any = [];

  constructor(private userApi:UserApiService) {

    this.userApi.getCaloriesTracks().subscribe((resp:any) =>{
      console.log(resp);
      if(resp && resp.data){

        this.items = resp.data;

      }
    });

  }

  editItem(item:any){

  }

  deleteItem(item:any){}

  onIonInfinite(ev:any) {
    // this.generateItems();
    console.log("infite scroll");
    
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
