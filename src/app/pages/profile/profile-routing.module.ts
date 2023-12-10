import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { ChangePassowrdComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'show'
      },
      {
        path: 'show',
        component: ShowProfileComponent,
      },
      {
        path: 'edit',
        component: EditProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePassowrdComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
