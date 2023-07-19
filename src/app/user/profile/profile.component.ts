import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserId } from 'src/app/types/user-profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  isLoading:boolean = true
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.profileInfo();
    this.isLoading = false
  }

   
  profileInfo():void{
    this.userService.getaAllProfile().subscribe({
      next:(profiles) => {
        console.log(profiles);
        
      }
    })
  
  }
}
