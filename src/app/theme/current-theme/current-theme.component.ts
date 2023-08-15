import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { UserService } from "src/app/user/user.service";
import { ThemeServiceService } from "../theme-service.service";
import { NgForm } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";

@Component({
  selector: "app-current-theme",
  templateUrl: "./current-theme.component.html",
  styleUrls: ["./current-theme.component.css"],
})
export class CurrentThemeComponent implements OnInit {
  commentsRef:AngularFireList<any>

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private themeService:ThemeServiceService,
    private afDb:AngularFireDatabase,
    private route:ActivatedRoute
  ) {
    this.themeId = this.route.snapshot.params['themeId']; //other id

    this.commentsRef = this.afDb.list(`/animals/${this.themeId}/comments`);
    this.comments = this.commentsRef.valueChanges()
  }
  currentCar: any = [];
  currentUser: any = [];
  isLoading: boolean = true;
  ownerId: any = [];
  isOwner: boolean = false;
  id:string = '';
  currentId:any;
  currentAnimalId:any;
  newComment:string = '';
  user:any;
  comments:any = [];
  themeId:string;
  commentsToShow:any[] = [];


  ngOnInit(): void {
    this.fetchTheme();
    this.userService.getProfileById(this.userService.getUserId()).subscribe((res) => {
     this.user = res
    });
   this.fetchComments();
    
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  fetchTheme(): void { 
     this.id = this.activatedRoute.snapshot.params["themeId"];
    const currentId = this.userService.getUserId();
    this.apiService.getCar(this.id).subscribe({
      next: (res) => {
        this.currentCar = res;

        this.ownerId = res.owner_id
        this.isOwner = this.themeService.isOwnerCheck(this.ownerId, currentId);
  
        this.userService.getProfileById(this.ownerId).subscribe({
          next: (user) => {
            this.currentUser = user;
          },
          error: (err) => console.log(err),
        }),
          (this.isLoading = false);
      },
    });
  }


  deleteAnimal(name:string): void {
    const id: string = this.activatedRoute.snapshot.params["themeId"];
    if(confirm(`Are you sure to delete ${name}`)) {
      this.apiService.delAnimal(id).subscribe();
      this.router.navigate(["/"]);
    } 
    return
  }

  fetchComments(){
   this.afDb.list(`/animals/${this.themeId}/comments`)
    .valueChanges().subscribe((res:any) => {
      this.commentsToShow = res
    });
  }

  sendComment(form:NgForm){
    this.newComment = form.value;
    this.currentId = this.userService.getUserId();// my profile id
    this.currentAnimalId = this.activatedRoute.snapshot.params["themeId"];
    
    this.apiService.getCar(this.currentAnimalId).subscribe((res) => {
      if(this.newComment !== ''){
        const comment = {
          comments:this.newComment,
          senderId:this.currentId,
          user:this.user.username,
          gender:this.user.gender,
        }
        this.commentsRef.push(comment);
        form.resetForm()
      }
      
    })
  }
}
