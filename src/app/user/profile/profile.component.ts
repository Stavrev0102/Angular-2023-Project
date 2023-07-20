import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoading:boolean = true;
  currentUser:any = [];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,) {}
  ngOnInit(): void {
    this.profileInfo();
    this.isLoading = false
  }

   
  profileInfo():void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.getProfileById(id).subscribe({
      next:(current) => {
        this.currentUser = current
      }
    })
    // this.userService.getAllProfile().subscribe({
    //   next:(users) => {
    //     this.usersArray = this.userService.getAllProfilesWithId(users)
    //     const id = this.activatedRoute.snapshot.params['id'];

    //  
          
    //   }
    // })
  
  }
}
