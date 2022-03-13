import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegistradoGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService,private router:Router,  ){

    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.auth.guard(state.url).then((res:any)=>{

        if(res.status==true){
          return true;
        }else{
          return false;
        }
        
      }).catch(err=>{

        return false;

      });

  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        
      return this.auth.guard(segments[0].path).then((res:any)=>{

        if(res.status==true){
          return true;
        }else{
          return false;
        }
        
      }).catch(err=>{

        return false;

      });
  }


}
