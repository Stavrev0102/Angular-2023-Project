import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Animal } from 'src/app/types/animal';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
})
export class NewThemeComponent {
  constructor(private apiService:ApiService,private router:Router) {}
  
  createPost(form:NgForm){
    this.apiService.postTheme(form).then((res) => {
      console.log(res);
    });
    this.router.navigate(['/'])
    
  }

}
 