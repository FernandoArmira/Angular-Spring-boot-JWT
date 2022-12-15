import { Component, OnInit } from '@angular/core';
import { UserService } from '../sevices/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  message: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forAdmin();
  }

  forAdmin() {
    this.userService.forAdmin().subscribe(
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
