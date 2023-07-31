import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/types/user';
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
    currentUser:any = [];
    isLoading:boolean = true;
    ownerId:any = []
    isOwner:boolean = false


  ngOnInit(): void {
    this.fetchTheme();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  fetchTheme(): void{
    const id:string = this.activatedRoute.snapshot.params['themeId']; 
    const currentId = this.userService.getUserId()
    this.apiService.getAnimal(id).subscribe({
      next:((res) => {
        this.currentAnimal = res;
        this.ownerId = res.owner_id;
         this.isOwner = this.isOwnerCheck(this.ownerId,currentId)
        this.userService.getProfileById(this.ownerId).subscribe({
          next:((user) => {
            this.currentUser = user
            console.log(this.currentUser);
            
          }),
          error:(err => console.log(err))
        }),

        this.isLoading = false
      })
    }); 
     
  }

  isOwnerCheck(ownerId:string,currentId:string | undefined | null):boolean{
    if(ownerId === currentId){
      return true
    }
    return false
  }

  deleteAnimal(): void{
    const id:string = this.activatedRoute.snapshot.params['themeId'];    
    console.log(this.apiService.delAnimal(id).subscribe())
    this.router.navigate(['/'])    
  }
}
