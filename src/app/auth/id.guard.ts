import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { map } from "rxjs/operators";

@Injectable()
export class idGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
    pageId:any
  canActivate(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.pageId = route.paramMap.get("id");
    return this.userService.getAllProfiles().pipe(
      map((res:any) => {  
        if (Object.keys(res).includes(this.pageId)) {
          return true; 
        } else {    
          return this.router.createUrlTree(["404"]);
        }
      })
    );
  }
}