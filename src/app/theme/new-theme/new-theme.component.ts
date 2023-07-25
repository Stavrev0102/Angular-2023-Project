import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DBPOST } from 'src/app/types/DBPOST';


@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
})
export class NewThemeComponent {
  constructor(private apiService:ApiService,private router:Router) {}

  createPost(form:NgForm){
    //get id from current user and add it after form
    const id = '123'
    this.apiService.postAnimal(form,id).subscribe({
      next:(res:DBPOST) => {
        console.log(res);
      }
    })
    this.router.navigate(['/'])
    
  }

}
 