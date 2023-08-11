import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, from, switchMap, tap, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private afAuth: AngularFireAuth,private router:Router,private userService:UserService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.userService.isLogged){
      const token = this.userService.getToken();
      req = req.clone({
        setParams: {
           auth:token ?? ''
        }
      })
    }
  return next.handle(req)
    .pipe(
    tap(() => {
      console.log('Intercept Sucessfully!')
    }),
      catchError((error: HttpErrorResponse) => {
        console.log("[Error]", error)
        if (error.status === 401) {
          this.userService.logout()
          this.router.navigate(["login"], {
            queryParams: {
              authFailed: true
            }
          })
        }
        return throwError(error)
      })
    );

}
  }


