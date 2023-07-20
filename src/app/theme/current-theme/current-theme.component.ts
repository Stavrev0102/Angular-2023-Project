import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
})
export class CurrentThemeComponent implements OnInit {
 
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router:Router
  ) {}
    currentAnimal:any = [];
    isLoading:boolean = true;

  ngOnInit(): void {
    this.fetchTheme();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

   fetchTheme(): void{
    const id:string = this.activatedRoute.snapshot.params['themeId'];
    //console.log(this.activatedRoute.snapshot.params);
    this.apiService.getAnimal(id).subscribe({
      next:((res) => {
        this.currentAnimal = res
        this.isLoading = false
      })
    });
         
  }

  deleteAnimal(): void{
    const id:string = this.activatedRoute.snapshot.params['themeId'];    
    console.log(this.apiService.delAnimal(id).subscribe())
    this.router.navigate(['/'])    
  }
}
