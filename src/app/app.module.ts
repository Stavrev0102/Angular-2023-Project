import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";


import { NotFoundComponent } from './not-found/not-found.component';
import { environment1 } from 'src/environments/environment';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth-guard.guard';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthGuardEdit } from './auth/edit-guard.guard';
import { idGuard } from './auth/id.guard';
import { ThemeGuard } from './auth/theme.guard';
import { SearchComponent } from './search/search.component';
import { IsLoggedGuard } from './auth/is-logged.guard';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    ThemeListComponent,
    HomeComponent,
    NotFoundComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment1.firebaseConfig),
    AngularFireDatabaseModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    ThemeModule,
    AppRoutingModule,
    FormsModule,
   
  ],
  providers: [INTERCEPTOR_PROVIDER,AuthGuard,AuthGuardEdit,ThemeGuard,idGuard,IsLoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
 