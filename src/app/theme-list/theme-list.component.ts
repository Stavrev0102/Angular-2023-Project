import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Animal } from '../types/animal';
import { Subscription } from 'rxjs';
import { CanActivateFn } from '@angular/router';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit, OnDestroy {
  animalSubscription:Subscription = new Subscription
  animalList:Animal[] = [];
  isLoading:boolean = true;
  constructor(private apiService: ApiService,private userService:UserService) {}

  get isLogged():boolean {
    return  this.userService.isLogged;
  }

  ngOnInit(): void {
  this.animalSubscription =  this.apiService.getAll().subscribe({
    next:((res) => {
      this.animalList = res.reverse();
      this.isLoading = false;  
      
    })
  });

  }
  ngOnDestroy(): void {
    this.animalSubscription.unsubscribe()
  }
}
