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

  items: any = [];
  page = 1;
  body: any = {
    search_text: '',
    start_date: '',
    end_date: ''
  };


  constructor(private userApi: UserApiService, private router: Router, public alertController: AlertController) {
    this.getItems(1);
  }


  editItem(item: any) {
    console.log("edit");

    this.router.navigateByUrl('/food/create', { state: { item: item } });
  }

  async deleteItem(item: any) {
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
            this.userApi.deleteCalorieTrack(item.id).subscribe((resp: any) => {
              this.items = this.items.filter((element: any) => element.id !== item.id);


            },
              (error) => {
                console.error('Error al eliminar:', error);
                let token = localStorage.getItem('token');
                if (token && token === "faketoken") {
                  this.items = this.items.filter((element: any) => element.id !== item.id);
                  let itemsString = JSON.stringify(this.items);
                  localStorage.setItem('items', itemsString);
                }
              });

          }
        }
      ]
    });

    await alert.present();
  }

  onIonInfinite(ev: any) {
console.log(this.body);

    this.page = this.page + 1;
    if(this.body.start_date != '' || this.body.end_date != '' || this.body.search_text != ''){
    }else{

      this.getItems(this.page);
    }
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);


  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");

    this.page = 1;
    this.getItems(this.page);

  }

  getItems(page: number) {
    console.log(page);
    
    this.userApi.getCaloriesTracks(page).subscribe((resp: any) => {
      console.log(resp);
      
      if (resp && resp.data) {

        this.items = [...this.items, ...resp.data];

      }
    }, (error) => {
      console.log("manejo error lista");
      setTimeout(() => {
        let itemstemp = localStorage.getItem("items");
        if (itemstemp) {
          this.items = JSON.parse(itemstemp);
        }

      }, 500);
    });
  }

  searchText(event: any) {
    
    const text = event.target.value;

    if (text === "") {
      this.body.search_text = "";
      
      this.items = [];
      this.page = 1;
      this.getItems(this.page);
      return;
    }
    this.body.search_text = text;
    this.search();


  }

  goCreate() {
    this.router.navigateByUrl('/food/create')
  }

  public rangeDate(event: any) {

    if (event.type == 'start_date') {
      this.body.start_date = event.datemodal
    } else if (event.type == 'end_date') {
      this.body.end_date = event.datemodal
    }
    this.search();
  }


  search() {
    console.log("searching");
    let querySearch = {...this.body};
    if(querySearch.start_date == '' || querySearch.end_date == ''){
      delete querySearch.start_date;
      delete querySearch.end_date;
    }
    this.userApi.searchCaloriesTracks(querySearch).subscribe((resp: any) => {

      if (resp && resp.data) {
        this.items = resp.data
      }
    }, (error) => {
      if(error.status == 0){
        console.log("offline");
        
        let itemstemp = localStorage.getItem("items");
        if (itemstemp) {
          this.items = JSON.parse(itemstemp);
          this.items = this.items.filter((item: any) => {
            console.log("filtro", !this.body.search_text);
            
            let passesTextFilter = !this.body.search_text || item.food.includes(this.body.search_text);
            let passesStartDateFilter = !this.body.start_date || new Date(item.dateFood) >= new Date(this.body.start_date);
            let passesEndDateFilter = !this.body.end_date || new Date(item.dateFood) <= new Date(this.body.end_date);
            console.log(passesStartDateFilter);
            console.log(passesEndDateFilter);
            
            return passesTextFilter && passesStartDateFilter && passesEndDateFilter;
          });
        }
        
      }



    });
  }


}
