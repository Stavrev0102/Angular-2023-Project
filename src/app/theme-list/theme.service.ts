import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http:HttpClient) { }
    animal:any;

     getAnimals():Observable<any> {
        return this.http.get(`${environment.appUrl}/books/.json`)
     }  

  getArrayValues(animalArray:any,idArray:any){

    for (const animal of animalArray) {
      animal.id = idArray.shift()
    }
    return
   }


}
