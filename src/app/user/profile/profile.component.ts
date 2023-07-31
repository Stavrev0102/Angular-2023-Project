import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoading:boolean = true;
  currentUser:any = [];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, public angularFireAuth: AngularFireAuth) {}
  ngOnInit(): void {
    this.profileInfo();
    this.isLoading = false
  }

   
  profileInfo():void{
    const id = (this.activatedRoute.snapshot.params['id']);
    console.log(id);
    
    // const userId = this.userService.getUserId()
    // console.log(userId);
    this.userService.getUser(id).subscribe((res) => {
      this.currentUser = res;
    })
  
    
    
    
    // this.userService.getProfileById(userId).subscribe({
    //   next:(current) => {
    //     this.currentUser = current
    //     console.log(this.currentUser);
        
    //   }
    // });
  
  }
}
