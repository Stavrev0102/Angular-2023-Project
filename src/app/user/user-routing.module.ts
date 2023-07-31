import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [AuthActivate],
  },
  {
    path: 'register',
    component: RegisterComponent,
    //canActivate: [AuthActivate],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    //canActivate: [AuthActivate],
  },
  {
    path:'all-users',
    children:[
      {
        path:'',
        pathMatch:'full',
        component:AllUsersComponent
      },
      {
        path:':id',
        component:ProfileComponent
      },
    ]

  },

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
