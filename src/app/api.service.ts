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
} from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { Animal } from "./types/animal";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient, private fs: Firestore) {}

  getTheme(id: string) {
    const { appUrl } = environment;
    return this.http.get<SinglePost>(
      `https://db-test-2-f0abf-default-rtdb.firebaseio.com/books/${id}/.json`
    );
  }

  getAnimals() {
    const { appUrl } = environment;
    let collectionBooks = collection(this.fs, "books");
    return collectionData(collectionBooks, { idField: "id" });
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
}
