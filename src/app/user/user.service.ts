import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Form, NgForm } from '@angular/forms';
import { Register } from '../types/register';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = '[user]';
  usersArray:any = [];
  usersId:string[] = []

  get isLogged(): boolean {
    // !! to be sure that it is boolean
    return !!this.user;
  }

  constructor(private http:HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  login(form:NgForm): void {
    const currentForm = form.value
    
    this.user = {
      email: currentForm.email,
      firstName: currentForm.firstName,
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  register(data:any): void {
    this.user = {
      email:data.email,
      firstName:'Ivan'
    }
    localStorage.setItem(this.USER_KEY,JSON.stringify(this.user))
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }
  getAllProfile() {
    const { appUrl } = environment;
    return this.http.get(`${appUrl}/users/.json`,)
  }
  

  getAllProfilesWithId(users:object){
    if(users !== null){
      this.usersArray = Object.values(users);
       this.usersId = Object.keys(users)
  
  for (const user of this.usersArray) {
    user.id = this.usersId.shift();
  }
    return this.usersArray
      }
      
      
    
  }

}
