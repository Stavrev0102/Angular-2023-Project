import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Animal } from '../types/animal';
import { Subscription } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { Car } from '../types/Car';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit, OnDestroy {
  carsSubscription:Subscription = new Subscription
  carsList:Car[] = [];
  isLoading:boolean = true;
  constructor(private apiService: ApiService,private userService:UserService) {}

  get isLogged():boolean {
    return  this.userService.isLogged;
  }

  ngOnInit(): void {
  this.carsSubscription =  this.apiService.getAll().subscribe({
    next:((res) => {
      this.carsList = res.reverse();
      this.isLoading = false;  
    })
  });

  }
  ngOnDestroy(): void {
    this.carsSubscription.unsubscribe()
  }
}
