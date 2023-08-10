import { Component } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DEFAULT_EMAIL_DOMAINS } from "src/app/shared/constants";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;
  incorrrectData:boolean  = false;
  
  async login(form:NgForm){
    const currentForm = form.value
     const {email,password} = form.value
      try {
        const userData = await this.afAuth.signInWithEmailAndPassword(email,password)
        if (userData && ( userData).user) {
          const { uid } = userData.user;
          this.userService.setUserId(uid);
          const token = await userData.user.getIdToken();
          this.userService.setToken(token);
        }
        this.router.navigate(['/themes'])
        return userData;
      } catch (error:any) {
        this.incorrrectData = true
        return 
      }
   
   
  }
}
