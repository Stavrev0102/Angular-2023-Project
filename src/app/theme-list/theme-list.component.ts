import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
import { Car } from '../types/Car';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit, OnDestroy {
  carsSubscription:Subscription = new Subscription
  carsList:Car[] = [];
  isLoading:boolean = true;
  constructor(private sanitizer:DomSanitizer ,private apiService: ApiService,private userService:UserService) {}

  get isLogged():boolean {
    return  this.userService.isLogged;
  }

 
  

  ngOnInit(): void {
  this.carsSubscription =  this.apiService.getAll().subscribe({
    next:((res:Car[]) => {
      this.carsList = res.reverse();
      this.isLoading = false;  
    })
  });


  }
  ngOnDestroy(): void {
    this.carsSubscription.unsubscribe()
  }
}
