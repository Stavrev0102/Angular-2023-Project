import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { NgForm } from "@angular/forms";
import { Animal } from "./types/animal";
import { Observable, map } from "rxjs";
import { FbCreatedResponse } from "./types/FbCreatedResponse";
import { Post } from "./types/post";
import { User } from "./types/user";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  getProfile(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getAll():Observable<Animal[]>{
    const { appUrl } = environment
    return this.http.get<Animal>(`${appUrl}/animals/.json`)
    .pipe(map((response : {[key:string] : any}) => {
      return Object.keys(response).map((key:string) => ({
        ...response[key],
        id:key,
      }))
    }))
   }
   getAlls():Observable<Animal[]>{
    const { appUrl } = environment
    return this.http.get<Animal[]>(`${appUrl}/animals/.json`)
   }

  getAnimal( id:string | null ):Observable<Animal>{
    const { appUrl } = environment;
    return this.http.get<Animal>(`${appUrl}/animals/${id}/.json`)
  }

  getCurrentUser(): Observable<User> {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const { appUrl } = environment;
    return this.http
      .get<User>(`${appUrl}/users/${userId}/.json`);
  }

  postAnimal(form: NgForm,id:string | null):Observable<Post> {
    const data = form.value;
    data.owner_id = id;
    const { appUrl } = environment;
    return this.http.post<Post>(`${appUrl}/animals/.json`,data)
    .pipe(map((response: FbCreatedResponse) => {
      return {
        ...data,
        id:response.name
      }
    }))
  }
  editAnimal(form:NgForm,id:string | null,currentUserId:string | null):Observable<Post> {
    const data = form.value;
    data.owner_id = currentUserId
    const { appUrl } = environment;
    return this.http.put<Post>(`${appUrl}/animals/${id}/.json`,data)
  } 

  delAnimal(id:string):Observable<string>{
    const { appUrl } = environment;
    return this.http.delete<string>(`${appUrl}/animals/${id}/.json`,)
  }
}
