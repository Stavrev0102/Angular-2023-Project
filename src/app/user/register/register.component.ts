import { Component } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { matchPasswordValidator } from "src/app/shared/validators/match-password-validator";
import { appEmailValidator } from "src/app/shared/validators/app-email-validator";
import { DEFAULT_EMAIL_DOMAINS } from "src/app/shared/constants";
import { Register } from "src/app/types/register";
import { AngularFireAuth } from "@angular/fire/compat/auth";
//import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
 
  form = this.fb.group({
    username: ['',[Validators.required,Validators.minLength(5)]],
    email: ["",[Validators.required,appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
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
    private afAuth: AngularFireAuth
    //private authService:AuthService
  ) {}
    id:string = '';
    posts:any

  async register() {
    if(this.form.invalid) return
    
    const data = this.form.value
    const userData = await this.userService.register(data);
    this.userService.saveUserData(
      userData.user?.uid,
      data.username,
      data.email,
      data.telephone,
    );

    this.router.navigate(["/themes"]);
  } 
  //  const currentUser = this.userService.register(data)
  //  console.log(currentUser)
   
    // this.userService.setProfileInRB(data).subscribe({
    //   next:(res) => {
    //     const id = Object.values(res).join('');
    //     localStorage.setItem('DB-User',id)   
    //   },
    //   error:(err) => {console.log(err);
    //   },
    // })
    //  this.router.navigate(["/catalog"]);
  }

 