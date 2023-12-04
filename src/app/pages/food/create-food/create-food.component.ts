import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.scss'],
})
export class CreateFoodComponent  {

  registroForm: FormGroup;
  item:any;
  
  constructor(private formBuilder: FormBuilder, private userApi:UserApiService, private router:Router) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.item = navigation.extras["state"]["item"];
    }

    this.registroForm = this.formBuilder.group({
      food: [this.item? this.item['food']:'', Validators.required],
      quantity: [this.item?this.item['quantity']:'', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      calories: [this.item?this.item['calories']:'', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      dateFood: [this.item?this.item['dateFood']:'', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) { 
      let data = this.registroForm.value;
      if(this.item){
        this.userApi.updateCalorieTrack(data, this.item.id).subscribe((resp:any)=>{
          if(resp && resp.message==="Success"){
            this.router.navigateByUrl("/food/list");
          }
        }, (error) => {
          let itemsTemp = localStorage.getItem("items");
          data.id = data.dateFood;
          if(itemsTemp){
            let temp = JSON.parse(itemsTemp);
            const index = temp.findIndex((objeto:any) => objeto.id === data.id);
            if (index !== -1) {
              temp[index] = data;
            } else {
              temp = [data, ...temp];
            }
            let temp2 = JSON.stringify(temp);
              

            localStorage.setItem("items",temp2);
            this.router.navigateByUrl("/food/list");
          }
               

        });
      }else{

        this.userApi.createCalorieTrack(data).subscribe((resp:any)=>{
          if(resp && resp.id){
            this.router.navigateByUrl("/food/list");
          }
        }, (error) => {
          console.log("manejo error");
          
          let itemsTemp = localStorage.getItem("items");
          data.id = data.dateFood;
          if(!itemsTemp){
            let temp = [data];
            let temp2 = JSON.stringify(temp);
            localStorage.setItem("items",temp2);
          }else{

            let temp = JSON.parse(itemsTemp);
            const index = temp.findIndex((objeto:any) => objeto.id === data.id);
            if (index !== -1) {
              temp[index] = data;
            } else {
              temp = [data, ...temp];
            }
            let temp2 = JSON.stringify(temp);
              

            localStorage.setItem("items",temp2);

          }
          this.router.navigateByUrl("/food/list");
        });
      }
    } else {
      // Manejo de errores o validaciones adicionales
    }
  }

}
