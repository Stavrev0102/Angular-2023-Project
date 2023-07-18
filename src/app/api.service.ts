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
import { LoginComponent } from "./user/login/login.component";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient, private fs: Firestore) {}

  async getTheme(id: string) {
    const docRef = doc(this.fs, "books", id);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data()
  
   return result
  }

  getAnimals() {
    const { appUrl } = environment;
    return this.http.get(`${appUrl}/books/.json`)
  }
  getAnimal(id:string){
    const { appUrl } = environment;
    return this.http.get<Animal>(`${appUrl}/books/${id}/.json`)
  }

  postTheme(form: NgForm) {
    const data = form.value;
    let animalPost: Animal[] = [];
    animalPost = data;

    let collectionBooks = collection(this.fs, "books");

    return addDoc(collectionBooks, animalPost);
  }

  getProfile(id: string) {
    return this.http.get<UserId>(
      `https://db-test-2-f0abf-default-rtdb.firebaseio.com/users/${id}/.json`
    );
  }

  delAnimal(id:string) {
    let docRef = doc(this.fs,'books/'+id)
    return deleteDoc(docRef)
  }
}
