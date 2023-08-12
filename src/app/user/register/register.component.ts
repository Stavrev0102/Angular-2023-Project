import { Component } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { matchPasswordValidator } from "src/app/shared/validators/match-password-validator";
import { appEmailValidator } from "src/app/shared/validators/app-email-validator";
import { DEFAULT_EMAIL_DOMAINS } from "src/app/shared/constants";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
 
  form = this.fb.group({
    username: ['',[Validators.required,Validators.minLength(5)]],
    email: ["",[Validators.required,appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    gender:['',[Validators.required]],
    telephone:['',[Validators.required,Validators.minLength(8)]],
    passGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        rePassword: ['',[Validators.required]],
      },
      {
        validator: [matchPasswordValidator("password", "rePassword")],
      }
    ),
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {}
    incorrrectData:boolean  = false

  async register(){
    if(this.form.invalid) return
    try {
    const data = this.form.value
    const userData = await this.userService.register(data);
    this.userService.saveUserData(
      userData.user?.uid,
      data.username,
      data.email,
      data.telephone,
      data.gender
    );
    this.router.navigate(["/themes"]);
    } catch (error:any) {
      if(error.message.includes('email')){
        this.incorrrectData = true
      }
      console.log(error.message);
      
    }
   } 
  }

 