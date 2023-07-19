import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
constructor(private http:HttpClient,private userService:UserService){}
isLoading:boolean = true
usersArray:any = [];
  ngOnInit(): void {
    this.userService.getAllProfile().subscribe({
      next:(users) => {
        this.usersArray = this.userService.getAllProfilesWithId(users)
          this.isLoading = false
          
      }
    })
  }
 
}
 