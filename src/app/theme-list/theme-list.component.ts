import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Animal } from '../types/animal';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit {

  animalList:any = [];
  isLoading:boolean = true;
  animalArray:any = [];
  animalId:any = []
  finalAnimal:any = []
  constructor(private apiService: ApiService,private userService:UserService) {}

  get isLogged():boolean {
    return  this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getAnimals().subscribe({
      next:(animals) => {
        //console.log(animals);
        this.animalList = animals

        this.animalArray = Object.values(this.animalList);
        this.animalId = Object.keys(this.animalList);
        console.log(this.animalArray[0] );
        
     for (const animal of this.animalArray) {
         animal.id = this.animalId.shift()
        }
        console.log(this.animalArray);
        
        this.isLoading = false
      },
      error:(err) => { 
        console.error(`Error: ${err}`) 
      }
  });
  }
}
