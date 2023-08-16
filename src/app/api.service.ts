import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { NgForm } from "@angular/forms";
import { Animal } from "./types/animal";
import { Observable, map } from "rxjs";
import { FbCreatedResponse } from "./types/FbCreatedResponse";
import { Post } from "./types/post";
import { User } from "./types/user";
import { Car } from "./types/Car";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  getProfile(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getAll():Observable<Car[]>{
    const { appUrl } = environment
    return this.http.get<Car>(`${appUrl}/cars/.json`)
    .pipe(map((response : {[key:string] : any}) => {
      if (response) {
        return Object.keys(response).map((key: string) => ({
          ...response[key],
          id: key,
        }));
      } else {
        return []; // or handle null/undefined case as needed
      }
    }))
   }

  getCar( id:string | null ):Observable<Car>{
    const { appUrl } = environment;
    return this.http.get<Car>(`${appUrl}/cars/${id}/.json`)
  }

  getCurrentUser(): Observable<User> {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const { appUrl } = environment;
    return this.http
      .get<User>(`${appUrl}/users/${userId}/.json`);
  }

  postOffer(form: NgForm, id: string | null): Observable<Car> {
    const data = form.value;
    data.owner_id = id;
    const { appUrl } = environment;
    
    return this.http.post<FbCreatedResponse>(`${appUrl}/cars/.json`, data)
      .pipe(
        map((response: FbCreatedResponse) => {
          const newCar: Car = {
            ...data,
            id: response.name
          };
          return newCar;
        })
      );
  }
  
  editCar(form:NgForm,id:string | null,currentUserId:string | null):Observable<Car> {
    const data = form.value;
    data.owner_id = currentUserId
    const { appUrl } = environment;
    return this.http.put<Car>(`${appUrl}/cars/${id}/.json`,data)
  } 
  getAlls():Observable<Car[]>{
    const { appUrl } = environment
    return this.http.get<Car[]>(`${appUrl}/cars/.json`)
  }

  delCar(id:string):Observable<string>{
    const { appUrl } = environment;
    return this.http.delete<string>(`${appUrl}/cars/${id}/.json`,)
  }
  
  getComments(themeId:string):Observable<string[]>{
    const { appUrl } = environment;
    return this.http.get<string[]>(`${appUrl}/animals/${themeId}/comments.json`)
    
  }
}
