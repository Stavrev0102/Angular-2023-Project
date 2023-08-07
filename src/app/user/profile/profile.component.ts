
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ApiService } from "src/app/api.service";
import { User } from "src/app/types/user";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, Subject } from "rxjs";
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  currentUser: any = [];
  postsArray: any = [];
  posts: any = [];
  id: any;
  currentId: any = [];
  followers: any[] = [];
  followings:any[] = []
  isFollow: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.pipe(
      switchMap(params => {
        this.id = params["id"];
        this.currentId = this.userService.getUserId();

        if (this.id === undefined) this.id = this.currentId;

        return this.userService.getUser(this.id);
      }),
      takeUntil(this.destroy$)
    ).subscribe((res) => {
      this.currentUser = res;
      
      if (this.currentUser.followers) {
        this.followers = Object.keys(this.currentUser.followers); 
        this.isFollow = this.followers.includes(this.currentId);
      };
      if(this.currentUser.following){
        this.followings = Object.keys(this.currentUser.following);
      } else{
        this.followings = [];
      }
      if(!this.currentUser.followers){
        this.followers = [];
        this.isFollow = false
      }

      this.apiService.getAll().subscribe((posts) => {
        this.postsArray = posts.filter((x) => x.owner_id == this.id);
        this.isLoading = false;
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  follow(currentUserId: string) {
    try {
      this.userService.followFunc(currentUserId, this.id)
        .subscribe(() => {
          this.ngOnInit();
        });
    } catch (error) {
      console.log(error);
    }
  }

  unFollow(currentId:string,id:string){
    try {
      this.userService.unFollowFunc(currentId,id)
        .subscribe(() => { 
          this.ngOnInit();
        });
    } catch (error) {
      console.log(error);
    }
    
  }
}




// import { Component, OnInit } from "@angular/core";
// import { ActivatedRoute, Router } from "@angular/router";
// import { UserService } from "../user.service";
// import { AngularFireAuth } from "@angular/fire/compat/auth";
// import { ApiService } from "src/app/api.service";
// import { User } from "src/app/types/user";
// import { AngularFireDatabase } from "@angular/fire/compat/database";
// import { Observable, Subject } from "rxjs";


// @Component({
//   selector: "app-profile",
//   templateUrl: "./profile.component.html",
//   styleUrls: ["./profile.component.css"],
// })
// export class ProfileComponent implements OnInit {
//   isLoading: boolean = true;
//   currentUser: any = []
//   postsArray: any = [];
//   posts: any = [];
//   id: any;
//   currentId:any = [];
//   followers:any[] = [];
//   isFollow:boolean = false;
//   following$$ = new Subject<void>
  
//   constructor(
//     private apiService: ApiService,
//     private userService: UserService,
//     private activatedRoute: ActivatedRoute,
//     public angularFireAuth: AngularFireAuth,
//     private router:Router
//   ) {}
//   ngOnInit(): void {

//     this.profileInfo();
//     this.isLoading = false;
//   }

//   profileInfo(): void {
//     this.id = this.activatedRoute.snapshot.params["id"];
//     this.currentId = this.userService.getUserId();

//     if (this.id === undefined) this.id = this.userService.getUserId();
//     this.userService.getUser(this.id).subscribe((res) => {
//       this.currentUser = res;
//       if(this.currentUser.followers){
//         this.followers = Object.keys(this.currentUser.followers)
//         this.isFollow = this.followers.includes(this.currentId); 
//       };
//       this.apiService.getAll().subscribe((posts) => {
//         this.postsArray = posts.filter((x) => x.owner_id == this.id);
//       });
//     });
//   }

   

//   follow(currentUserId:string){
//     this.id = this.activatedRoute.snapshot.params["id"];
//     const userId = this.userService.getUserId()
//     console.log('Current User id -->',currentUserId);
//     console.log('Profile to follow id -->',this.id);
//     try {
//       this.userService.followFunc(currentUserId,this.id);
//       this.following$$.next();
//       this.router.navigate([`/all-users/${this.id}`]);
//     } catch (error) {
//       console.log(error);
      
//     } 
//   }
// }
