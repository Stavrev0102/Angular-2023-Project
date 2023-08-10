import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isBurgerMenuActive = false;
  activatedRoute: any;
  constructor(private userService: UserService,private router:Router) {}
  id:string | null = '';

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
     this.id = this.userService.getUserId();
     
  }
  toggleBurgerMenu() {
    this.isBurgerMenuActive = !this.isBurgerMenuActive;
  }

  logout():void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
