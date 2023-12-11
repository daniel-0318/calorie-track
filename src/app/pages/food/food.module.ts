import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodPageRoutingModule } from './food-routing.module';

import { FoodPage } from './food.page';
import { ListFoodComponent } from './list-food/list-food.component';
import { CreateFoodComponent } from './create-food/create-food.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [FoodPage, ListFoodComponent, CreateFoodComponent]
})
export class FoodPageModule {}
