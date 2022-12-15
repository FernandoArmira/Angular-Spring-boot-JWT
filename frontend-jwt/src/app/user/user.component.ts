import { Component, OnInit } from '@angular/core';
import { UserService } from '../sevices/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.userService.forUser().subscribe(
      {next: (response) => {
        console.log(response);
        this.message = response;
      }, 
      error: (error)=>{
        console.log(error);
      }}
    );
  }

}
