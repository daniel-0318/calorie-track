import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { UserApiService } from 'src/app/services/user-api.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss'],
})
export class ListFoodComponent {

  items:any = [];
  page = 1;

  constructor(private userApi:UserApiService, private router:Router, public alertController: AlertController) {

    this.getItems(1);

  }

  editItem(item:any){
    console.log("edit");
    
    this.router.navigateByUrl('/food/create',{ state: { item: item } });
  }

  async deleteItem(item:any){
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Sí',
          handler: () => {
            this.userApi.deleteCalorieTrack(item.id).subscribe((resp:any)=>{
              this.items = this.items.filter((element:any)=> element.id !== item.id);
              console.log(this.items.length);
              
            },
            (error) => {
              console.error('Error al eliminar:', error);
            });
            
          }
        }
      ]
    });

    await alert.present();
  }

  onIonInfinite(ev:any) {
    // this.generateItems();
    this.page = this.page+1;
    this.getItems(this.page);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
    
    
  }

  getItems(page:number){

    this.userApi.getCaloriesTracks(page).subscribe((resp:any) =>{

      if(resp && resp.data){

        this.items =[...this.items, ...resp.data];

      }
    });
  }

  search(event:any){
    
    const text = event.target.value;
    
    if(text===""){
      this.items = [];
      this.page=1;
      this.getItems(this.page);
      return;
    }

    let body = {
      search_text: text
    };

    this.userApi.searchCaloriesTracks(body).subscribe((resp:any)=>{

      if(resp && resp.data){
      this.items = resp.data
    }
    });

  }

  goCreate(){
    this.router.navigateByUrl('/food/create')
  }

}
