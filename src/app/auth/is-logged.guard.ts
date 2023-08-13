import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor(private userService:UserService , private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.isLogged) {
      return true
    } else {
      return this.router.createUrlTree(["home"]);
    }
  }
}
