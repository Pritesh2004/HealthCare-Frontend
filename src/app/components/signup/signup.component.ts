import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NormalUserService } from 'src/app/service/normal-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {



  user = {
    username: '',
    firstName: '',
    lastName:'',
    phoneNumber:'',
    email: '',
    password: '',
    address:'',
    gender:'',
    dateOfBirth:new Date(),
    };



  constructor(private userService: NormalUserService, private router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
  
  }


  signupUser(): void {
    this.userService.registerUser(this.user).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.snack.open('Registration successfull','ok',{
          verticalPosition:'top'
        });
        this.router.navigate(['login'])

        // Add any additional handling or redirection logic here
      },
      error => {
        console.error('Error registering user:', error);
        this.snack.open("Error registering user",'ok',{
          verticalPosition:'top'
        });

        // Handle error, display message, etc.
      }
    );
  }
}
