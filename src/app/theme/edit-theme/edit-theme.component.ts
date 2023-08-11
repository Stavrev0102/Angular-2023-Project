import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/api.service";
import { Animal } from "src/app/types/animal";
import { UserService } from "src/app/user/user.service";

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
  animalId: string = "";
  currentAnimal:any;
    ngOnInit(): void {
      this.animalId = this.activatedRoute.snapshot.params["themeId"];
      this.apiService.getAnimal(this.animalId).subscribe((res) => {
        this.currentAnimal = res
      })
    }
  

  editPost(form: NgForm) {
    if(form.invalid) return
    const currentUserId = this.userService.getUserId()
    this.animalId = this.activatedRoute.snapshot.params["themeId"];
    this.apiService.editAnimal(form,this.animalId,currentUserId).subscribe(res => {
    
     this.router.navigate([`/themes/${this.animalId}`])
    })
  }
}
