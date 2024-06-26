import { Component, OnInit } from '@angular/core';
import { NormalUserService } from 'src/app/service/normal-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  user :any;
  userId:any;
  constructor(private normalUserService : NormalUserService){}


  ngOnInit(): void {
    let userStr: any = localStorage.getItem('user');
    if (userStr) {
      let user = JSON.parse(userStr);
      this.userId = user.userId;
    } else {
      console.error('User data not found in localStorage.');
    }
    this.getUserDetails();
  }
  getUserDetails(): void {
    this.normalUserService.getUser(this.userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user details:', error);
        // Handle error as per your application's requirements
      }
    );
  }
}
