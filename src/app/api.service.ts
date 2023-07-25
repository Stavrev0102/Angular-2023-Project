import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { NgForm } from "@angular/forms";
import { Animal } from "./types/animal";
import { Observable, map } from "rxjs";
import { FbCreatedResponse } from "./types/FbCreatedResponse";
import { Post } from "./types/post";

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

  getAnimal( id:string ):Observable<Animal>{
    const { appUrl } = environment;
    return this.http.get<Animal>(`${appUrl}/animals/${id}/.json`)
  }

  postAnimal(form: NgForm,id:string):Observable<Post> {
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

  delAnimal(id:string):Observable<any>{
    const { appUrl } = environment;
    return this.http.delete(`${appUrl}/animals/${id}/.json`,)
  }
}
