import { Component } from '@angular/core';
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
  constructor(private apiService:ApiService,private router:Router,private userService:UserService) {}
  currentUser:any
  
  createPost(form:NgForm){
   const id = this.userService.getUserId()
    const currentUser = this.apiService.getCurrentUser().subscribe({
      next:(res) => {console.log(res);
      
      },
      error:(err) => {console.log(err);
      }
    })
    this.apiService.postAnimal(form,id).subscribe({
      next:(res:DBPOST) => {
        
      }
    })
    this.router.navigate(['/'])
    
  }

}
 