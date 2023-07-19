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
  constructor(private apiService: ApiService,private userService:UserService,private themeService:ThemeService) {}

  get isLogged():boolean {
    return  this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getAnimals().subscribe({
      next:(animals) => {
        this.animalList = this.themeService.getArrayValues(animals)
        this.isLoading = false
        console.log(this.animalList);
        
      },
      error:(err) => { 
        console.error(`Error: ${err}`) 
      }
  });
  }
}
