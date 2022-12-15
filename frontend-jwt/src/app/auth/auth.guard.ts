import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../sevices/user-auth.service';
import { UserService } from '../sevices/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthServuce:UserAuthService,
    private router:Router,
    private useService: UserService
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userAuthServuce.getToken() != null){
        const role = route.data["roles"] as Array<string>

        if(role){
          const match = this.useService.roleMatch(role);

          if(match){
            return true
          }else{
            this.router.navigate(['/forbidden']);
            return false
          }
        }
      }

      this.router.navigate(['/login']);

      return false;
      
  }
  
  
}
