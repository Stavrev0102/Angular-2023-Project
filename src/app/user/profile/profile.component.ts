
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ApiService } from "src/app/api.service";
import { Subject } from "rxjs";
import { takeUntil, switchMap } from 'rxjs/operators';
import { Animal } from "src/app/types/animal";
import { Car } from "src/app/types/Car";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  currentUser: any = [];
  postsArray: Car[] = [];
  id: string = '';
  currentId: any; 
  followers: string[] = [];
  followings:string[] = [];
  isFollow: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public angularFireAuth: AngularFireAuth,
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





