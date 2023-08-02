import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  activatedRoute: any;
  constructor(private userService: UserService,private router:Router) {}
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  id:any 
  idi:any
  get firstName(): string {
    return this.userService.user?.firstName || ''
  }

  ngOnInit(): void {
     this.id = this.userService.getUserId();
     console.log(this.id); 
     this.idi = (this.activatedRoute.snapshot.params['id']);   
     console.log(this.idi);
     
  }

  logout():void {
    this.userService.logout();
    this.router.navigate(['/'])
  }
}
