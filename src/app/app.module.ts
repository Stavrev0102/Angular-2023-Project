import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';
import { WelcomeComponent } from './welcome/welcome.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NotFoundComponent } from './not-found/not-found.component';

const firebaseConfig = {
  apiKey: "AIzaSyAjAA4lPW2ZKvv2ulVU9QePI821P1NlTIU",
  authDomain: "db-test-2-f0abf.firebaseapp.com",
  databaseURL: "https://db-test-2-f0abf-default-rtdb.firebaseio.com",
  projectId: "db-test-2-f0abf",
  storageBucket: "db-test-2-f0abf.appspot.com",
  messagingSenderId: "833901530760",
  appId: "1:833901530760:web:f40bea4a8a7454e26a193d",
  measurementId: "G-JXSB864988"
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ThemeListComponent,
    HomeComponent,
    WelcomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    CoreModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    ThemeModule,
    AppRoutingModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
