import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}
  appEmailDomains = DEFAULT_EMAIL_DOMAINS
  login(form:NgForm): void {
       if(form.invalid) return
    this.userService.login(form);
    this.router.navigate(['/'])
  }
}
 