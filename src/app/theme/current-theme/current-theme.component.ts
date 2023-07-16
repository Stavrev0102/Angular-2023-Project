import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import {  SinglePost } from 'src/app/types/singlePost';
import { Theme } from 'src/app/types/theme';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-theme',
  templateUrl: './current-theme.component.html',
  styleUrls: ['./current-theme.component.css'],
})
export class CurrentThemeComponent implements OnInit {
  book: SinglePost | undefined;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchTheme();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  fetchTheme(): void {
    const id = this.activatedRoute.snapshot.params['themeId'];
    
    this.apiService.getTheme(id).subscribe((book) => {
      this.book = book;
      console.log({ book });
    });
  }
}
