import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/types/user';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit,OnDestroy{
constructor(private userService:UserService){}
usersSubscription:Subscription = new Subscription
isLoading:boolean = true
usersArray:User[] = [];

  ngOnInit(): void {
   this.usersSubscription = this.userService.getAllProfile().subscribe({
      next:(users) => {
        this.usersArray = users;
        this.isLoading = false;
          
      }
    })
  }
  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe()
  }
  
}
 