import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllUsersComponent } from './all-users/all-users.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AllUsersComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,UserRoutingModule,SharedModule,FormsModule,ReactiveFormsModule,
  ]
})
export class UserModule { }
