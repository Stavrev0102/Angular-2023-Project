import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { AllUsersComponent } from './all-users/all-users.component';
import { AuthGuard } from '../auth/auth-guard.guard';
import { ChatsComponent } from './chats/chats.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [AuthActivate],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'all-users',
    children:[
      {
        path:'',
        pathMatch:'full',
        component:AllUsersComponent,
        canActivate:[AuthGuard]
      },
      {
        path:':id',
        component:ProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path:'chats/:id',
    component:ChatsComponent
  }

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
