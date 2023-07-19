import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../types/animal';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http:HttpClient) { }
  animalArray:Animal[] = [];
  animalId:string[] = []
  getArrayValues(animals:object){
    if(animals !== null){
      this.animalArray = Object.values(animals)
      this.animalId = Object.keys(animals);
        
      for (const animal of this.animalArray) {
        animal.id = this.animalId.shift()
      }
      return this.animalArray
    }
    return null

   }


}
