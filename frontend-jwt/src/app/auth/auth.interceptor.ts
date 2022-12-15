import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../sevices/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private userAuthService:UserAuthService,
        private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('No-Auth') === 'True'){
            return next.handle(req.clone());
        }

        const token = this.userAuthService.getToken();

        req = this.AddToken(req,token);

        return next.handle(req).pipe(
            catchError(
                    (err:HttpErrorResponse) => {
                        console.log(err.status);
                        if(err.status === 401){
                            this.router.navigate(['/login']);
                        }else if (err.status === 403){
                            this.router.navigate(['/forbidden']);
                        }
                        return throwError(() => new Error('Something is wrong'));
                    }
            )
        );

    }

    private AddToken(request:HttpRequest<any>,token:string){
        return request.clone({
            setHeaders:{
                Authorization : `Bearer ${token}` 
            }
        });
    }

}