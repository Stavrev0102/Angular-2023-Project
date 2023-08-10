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
export class ThemeGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private themeService: ThemeServiceService
  ) {}
    pageId:any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.pageId = route.paramMap.get("themeId");
    console.log(this.pageId);
    
    return this.apiService.getAlls().pipe(
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
