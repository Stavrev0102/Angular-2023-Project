import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from "@angular/fire/compat/database";



@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;   //da se oprawi posle na user
  USER_KEY = '[user]';
  usersArray:any = [];
  usersId:string[] = [];

  private tokenKey = "token";
  private loggedIn = false;

  get isLogged(): boolean {
   const token = localStorage.getItem('token')
    return !!token;
  }

  constructor(private http:HttpClient, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  public saveUserData(
    uid: any,
    username: any,
    email: any,
    telephone:any,
  ): void {
    const userData = {
      username,
      email,
      telephone,
      posts:{}
    };

    this.afDb.database
      .ref("users/" + uid)
      .update(userData)
      .then(() => {
        console.log("User data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  }


  async login(form:NgForm): Promise<firebase.default.auth.UserCredential> {
    const currentForm = form.value
     const {email,password} = form.value

    const userData = await this.afAuth.signInWithEmailAndPassword(email,password)
    if (userData && ( userData).user) {
      const { uid } = userData.user;
      this.setUserId(uid);
      const token = await userData.user.getIdToken();
      this.setToken(token);
    }
    
    return userData;
   
  }


  async register(data:any):  Promise<firebase.default.auth.UserCredential>  {

    const {username,email,telephone,passGroup} = data
    const user = await this.afAuth.createUserWithEmailAndPassword(
      email,
      passGroup.password
    )
    if (user && ( user).user) {
      const { uid } = user.user;
      this.setUserId(uid);
      const token = await user.user.getIdToken();
      this.setToken(token);
    }
    
    return user;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId():string | null {
    return localStorage.getItem('userId')
  }

  getUser(id:string): Observable<User[]> {
    const userId = this.getUserId();
    return this.http.get<User[]>(
    `${environment.appUrl}/users/${id}.json`
    );
  }
 


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.setLoggedInStatus(true);
  }
  private setLoggedInStatus(status: boolean): void {
    this.loggedIn = status;
  }


  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.setLoggedInStatus(false);
  }

  setUserId(uid: string) {
    localStorage.setItem("userId", uid);
  }

  clearUserId() {
    localStorage.removeItem("userId");
  }
  
  logout() {
    this.user = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.clear()
    return this.afAuth.signOut();
  }
  getAllProfile():Observable<User[]> {
      const { appUrl } = environment
      return this.http.get<User>(`${appUrl}/users/.json`)
      .pipe(map((response : {[key:string] : any}) => {
        return Object.keys(response).map((key:string) => ({
          ...response[key],
          id:key,
        }))
      }))
     
  }

  getProfileById(id:string | null):Observable<User>{
    const { appUrl } = environment
    return this.http.get<User>(`${appUrl}/users/${id}.json`)
  }

  setProfileInRB(data:any){
    const { appUrl } = environment
    return this.http.post(`${appUrl}/users/.json`,data)
  }
  
      //old solution
  // getAllProfilesWithId(users:object){
  //   if(users !== null){
  //     this.usersArray = Object.values(users);
  //      this.usersId = Object.keys(users)
  
  // for (const user of this.usersArray) {
  //   user.id = this.usersId.shift();
  // }
  //   return this.usersArray
  //     }
  // }

}
