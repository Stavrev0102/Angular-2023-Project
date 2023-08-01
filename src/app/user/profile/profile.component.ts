import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoading:boolean = true;
  currentUser:any = [];
  postsArray:any = [];
  posts:any = []
  constructor(private apiService:ApiService,private userService: UserService, private activatedRoute: ActivatedRoute, public angularFireAuth: AngularFireAuth) {}
  ngOnInit(): void {
    this.profileInfo();
    this.isLoading = false
  }

   
  profileInfo():void{
    const id = (this.activatedRoute.snapshot.params['id']);
    this.userService.getUser(id).subscribe((res) => {
      this.currentUser = res;
         this.apiService.getAll().subscribe((posts) => {
          this.postsArray = posts.filter((x) => x.owner_id == id);
          console.log(this.postsArray);
         });
    });
    
  };
}

