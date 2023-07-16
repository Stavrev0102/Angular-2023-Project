import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserId } from 'src/app/types/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: UserId | undefined;
  isLoading:boolean = true
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.profileInfo();
    this.isLoading = false
  }

   
  profileInfo():void{
    const profile = this.apiService.getProfile('1').subscribe(profile => {
      this.profile = profile
    })
    
    
  }
}
