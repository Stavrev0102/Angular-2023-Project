import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { Car } from "src/app/types/Car";
import { Animal } from "src/app/types/animal";
import { UserService } from "src/app/user/user.service";
import { BRANDS, YEARS } from "src/app/shared/constants";

@Component({
  selector: "app-edit-theme",
  templateUrl: "./edit-theme.component.html",
  styleUrls: ["./edit-theme.component.css"],
})
export class EditThemeComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router:Router
  ) {}
  carId: string = "";
  currentCar:any = {
    brand:''
  }
  years:number[] = YEARS;
  brands:string[] = BRANDS;
    ngOnInit(): void {
      this.carId = this.activatedRoute.snapshot.params["themeId"];
      try {
        this.apiService.getCar(this.carId).subscribe((res) => {
          this.currentCar = res
        })
      } catch (error) {
        console.log('Something went Wrong!');
        
      }
      
    }
  

  editPost(form: NgForm) {
    if(form.invalid) return
    const currentUserId = this.userService.getUserId()
    this.carId = this.activatedRoute.snapshot.params["themeId"];
    this.apiService.editCar(form,this.carId,currentUserId).subscribe(res => {
    
     this.router.navigate([`/themes/${this.carId}`])
    })
  }
}
