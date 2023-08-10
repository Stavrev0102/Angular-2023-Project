
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
import { ApiService } from "../api.service";
import { ThemeServiceService } from "../theme/theme-service.service";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuardEdit implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private themeService: ThemeServiceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const pageId = route.paramMap.get("themeId");
    const userId = this.userService.getUserId();

    return this.apiService.getAnimal(pageId).pipe(
      map((res) => {
        if (this.themeService.isOwnerCheck(res.owner_id, userId)) {
          return true;
        } else {
          return this.router.createUrlTree(["login"]);
        }
      })
    );
  }
}