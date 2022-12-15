import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../sevices/user-auth.service';
import { UserService } from '../sevices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
    //console.log("Form is submitted")
    this.userService.login(loginForm.value).subscribe({
      next: (response:any)=>{

      //console.log(response)

      this.userAuthService.setRoles(response.user.role);

      this.userAuthService.setToken(response.jwtToken);

      const role = response.user.role[0].roleName;

      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }


      },
      error:  (e) => {
      console.log(e)
      }
  });
  }

}
