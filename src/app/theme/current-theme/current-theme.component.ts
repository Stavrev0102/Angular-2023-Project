import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Animal } from 'src/app/types/animal';
import {  SinglePost } from 'src/app/types/singlePost';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
})
export class CurrentThemeComponent implements OnInit {
  book: SinglePost | undefined;
  animal: any;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router:Router
  ) {}
    currentAnimal:any = []
    isLoading:boolean = true
  ngOnInit(): void {
    
    this.fetchTheme();

    
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

   fetchTheme() {

    const id = this.activatedRoute.snapshot.params['themeId'];
    console.log(id);
    
    this.apiService.getAnimal(id).subscribe({
      next:((res) => {
        this.currentAnimal = res
        this.isLoading = false
      })
    });
         
  }

  deleteAnimal(): void{
    const id = this.activatedRoute.snapshot.params['themeId'];
    this.apiService.delAnimal(id)
    this.router.navigate(['/themes'])
    
  }
}
