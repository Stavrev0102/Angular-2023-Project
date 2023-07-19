import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Animal } from '../types/animal';
import { ThemeService } from './theme.service';

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
  constructor(private apiService: ApiService,private userService:UserService,private themeService1:ThemeService) {}

  get isLogged():boolean {
    return  this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getAnimals().subscribe({
      next:(animals) => {

        this.animalList = animals
        console.log(this.animalList);

        this.animalArray = Object.values(animals)
        this.animalId = Object.keys(animals);
        this.themeService1.getArrayValues(this.animalArray,this.animalId)
        console.log(this.animalArray);
        
        console.log(this.animalId);
        this.isLoading = false
      },
      error:(err) => { 
        console.error(`Error: ${err}`) 
      }
  });
  }
}
