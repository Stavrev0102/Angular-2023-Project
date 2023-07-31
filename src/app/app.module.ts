import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NotFoundComponent } from './not-found/not-found.component';
import { environment1 } from 'src/environments/environment';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth-guard.guard';
//import { AuthInterceptor } from './auth/auth.interceptor';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ThemeListComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment1.firebaseConfig),
    //provideFirebaseApp(() => initializeApp(environment1.firebaseConfig)),
    //provideFirestore(() => getFirestore()),
    CoreModule,
    HttpClientModule,
    SharedModule,
    ThemeModule,
    AppRoutingModule,
   
  ],
  providers: [INTERCEPTOR_PROVIDER,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
