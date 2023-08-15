import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Car} from 'src/app/types/Car';
import { UserService } from 'src/app/user/user.service';
import { BRANDS, YEARS } from 'src/app/shared/constants';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
})
export class NewThemeComponent {
  constructor(private afDB:AngularFireDatabase ,private apiService:ApiService,private router:Router,private userService:UserService) {}
  themeId:any
  brands:string[] = BRANDS
  years:number[] = YEARS;

  createPost(form:NgForm){
   const id = this.userService.getUserId()
   if(form.invalid) return
    this.apiService.postOffer(form,id).subscribe({
      next:(res:Car) => {
        this.themeId = res.id;
       this.afDB.database.ref(`users/${id}/posts/${this.themeId}`).set(true); 
      },
      error(err) {
        console.log(err);
        
      }
    });
    this.router.navigate(['/'])
    
  }

}
 