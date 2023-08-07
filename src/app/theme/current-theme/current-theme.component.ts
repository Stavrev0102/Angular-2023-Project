import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { User } from "src/app/types/user";
import { UserService } from "src/app/user/user.service";
import { ThemeServiceService } from "../theme-service.service";

@Component({
  selector: "app-current-theme",
  templateUrl: "./current-theme.component.html",
  styleUrls: ["./current-theme.component.css"],
})
export class CurrentThemeComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private themeService:ThemeServiceService
  ) {}
  currentAnimal: any = [];
  currentUser: any = [];
  isLoading: boolean = true;
  ownerId: any = [];
  isOwner: boolean = false;
  id:string = ''
  ngOnInit(): void {
    this.fetchTheme();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  fetchTheme(): void { 
     this.id = this.activatedRoute.snapshot.params["themeId"];
    const currentId = this.userService.getUserId();
    this.apiService.getAnimal(this.id).subscribe({
      next: (res) => {
        this.currentAnimal = res;

        this.ownerId = res.owner_id;
        this.isOwner = this.themeService.isOwnerCheck(this.ownerId, currentId);
        this.userService.getProfileById(this.ownerId).subscribe({
          next: (user) => {
            this.currentUser = user;
            console.log(this.currentUser);
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
      console.log(`Implement delete functionality here`);
      console.log(this.apiService.delAnimal(id).subscribe());
      this.router.navigate(["/"]);
    } 
    return
  }
}
