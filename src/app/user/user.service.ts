import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Form, NgForm } from '@angular/forms';
import { Register } from '../types/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    // !! to be sure that it is boolean
    return !!this.user;
  }

  constructor() {
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
}
