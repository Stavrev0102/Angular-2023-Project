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

  animalList:Animal[] = [];
  isLoading:boolean = true;
  constructor(private apiService: ApiService,private userService:UserService) {}

  get isLogged():boolean {
    return  this.userService.isLogged;
  }

  ngOnInit(): void {
  this.apiService.getAll().subscribe({
    next:((res) => {
      this.animalList = res;
      this.isLoading = false;  
    })
  })
  }
}
