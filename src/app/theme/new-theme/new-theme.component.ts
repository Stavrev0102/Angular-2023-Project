import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DBPOST } from 'src/app/types/DBPOST';
import { User } from 'src/app/types/user';


@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
})
export class NewThemeComponent {
  constructor(private apiService:ApiService,private router:Router) {}
  currentUser:any
  id:string = '';
  
  createPost(form:NgForm){
    //get id from current user and add it after form
    const currentUser = this.apiService.getCurrentUser().subscribe({
      next:(res) => {console.log(res);
      
      },
      error:(err) => {console.log(err);
      }
    })
    let id = '1'
    this.apiService.postAnimal(form,id).subscribe({
      next:(res:DBPOST) => {
        
      }
    })
    this.router.navigate(['/'])
    
  }

}
 