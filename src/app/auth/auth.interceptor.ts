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
    // this.afAuth.authState.subscribe((user) => {
    //   this.setLoggedInStatus(!!user);
    // });
    // this.loggedIn = !!this.getToken();
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
      console.log('Intercept')
    }),
      catchError((error: HttpErrorResponse) => {
        console.log("[Interceptor Error]", error)
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


    // return from(this.afAuth.currentUser).pipe(
    //   switchMap((user) => {
    //     if (user) {    
    //       // User is logged in, add the ID token to the request headers.
    //       return user.getIdToken().then((token) => {
    //         const authReq = request.clone({
    //            setHeaders: { Authorization: `Bearer ${token}` }
    //           // setParams: {
    //           //   auth: token ?? "",
    //           // },
    //         });
    //         console.log(authReq);
    //         //return next.handle(authReq);

    //         return next.handle(authReq).pipe(
    //           tap(() => {
    //             console.log("Intercept");
    //           }),
    //           catchError((error: HttpErrorResponse) => {
    //             console.log("[Interceptor Error]", error);
    //             if (error.status === 401) {
    //               this.userService.logout()
    //               this.router.navigate(["login"], {
    //                 queryParams: {
    //                   authFailed: true,
    //                 },
    //               });
    //             }
    //             return throwError(error);
    //           })
    //         );
    //       });
    //     } else {
    //       // User is not logged in, continue with the original request.
    //       console.log('not');
          
    //       return next.handle(request);
    //     }
    //   })
    // );
  }


