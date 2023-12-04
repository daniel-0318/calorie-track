import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodPage } from './food.page';
import { CreateFoodComponent } from './create-food/create-food.component';
import { ListFoodComponent } from './list-food/list-food.component';

const routes: Routes = [
  {
    path: '',
    component: FoodPage,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ListFoodComponent,
      },
      {
        path: 'create',
        component: CreateFoodComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPageRoutingModule {}
