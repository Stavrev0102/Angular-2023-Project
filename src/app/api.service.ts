import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SinglePost } from "./types/singlePost";
import { UserId } from "./types/user-profile";
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
} from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { Animal } from "./types/animal";
import { User } from "./types/user";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  getProfile(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private fs: Firestore) {}

  getAnimals() {
    const { appUrl } = environment;
    return this.http.get(`${appUrl}/animals/.json`)
  }
  getAnimal(id:string){
    const { appUrl } = environment;
    return this.http.get<Animal>(`${appUrl}/animals/${id}/.json`)
  }

  postTheme(form: NgForm) {
    const data = form.value;
    let animalPost: Animal[] = [];
    animalPost = data;
    const { appUrl } = environment;
    return this.http.get<Animal>(`${appUrl}/animals/.json`,)
  }

  delAnimal(id:string) {
    const { appUrl } = environment;
    return this.http.delete(`${appUrl}/books/${id}/.json`,)
  }
}
