import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../core/guards/auth.activate';
import { AllUsersComponent } from './all-users/all-users.component';
import { AuthGuard } from '../auth/auth-guard.guard';
import { ChatComponent } from './chat/chat.component';
import { idGuard } from '../auth/id.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
        canActivate: [AuthGuard,idGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path:'chats/:id',
    component:ChatComponent,
    canActivate: [AuthGuard],
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
