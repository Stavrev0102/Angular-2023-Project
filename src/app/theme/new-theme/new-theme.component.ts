import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DBPOST } from 'src/app/types/DBPOST';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
})
export class NewThemeComponent {
  constructor(private afDB:AngularFireDatabase ,private apiService:ApiService,private router:Router,private userService:UserService) {}
  currentUser:any
  themeId:any
  createPost(form:NgForm){
   const id = this.userService.getUserId()
    this.apiService.postAnimal(form,id).subscribe({
      next:(res:DBPOST) => {
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
 