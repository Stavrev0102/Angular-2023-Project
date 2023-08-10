import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "../api.service";
import { map } from "rxjs/operators";

@Injectable()
export class ThemeGuard implements CanActivate {
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {}
    pageId:any;
  canActivate(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.pageId = route.paramMap.get("themeId"); 
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
