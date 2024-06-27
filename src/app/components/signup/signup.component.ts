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
    
  formOtp = {
    fOtp: ''
  };
  
  otp: string = '';
  otpSent: boolean = false;

  constructor(private userService: NormalUserService, private router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.generateOTP();
  }

  generateOTP(): void {
    const digits = '0123456789';
    this.otp = '';
    for (let i = 0; i < 6; i++) {
      this.otp += digits[Math.floor(Math.random() * 10)];
    }
  }
  
  sendOTP(email: string): void {
    this.userService.sendOTP(email, this.otp).subscribe(
      response => {
        this.snack.open('Check your mail for OTP', 'OK', { verticalPosition: 'top' });
        this.otpSent = true;
      },
      error => {
        console.error('Error sending OTP:', error);
        this.snack.open('Error sending OTP. Please try again later.', 'OK', { verticalPosition: 'top' });
      }
    );
  }

  verifyOtp(formOtp: string): void {
    if (formOtp === this.otp) {
      this.signupUser();
    } else {
      this.snack.open('Wrong OTP entered', 'OK', { verticalPosition: 'top' });
    }
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
