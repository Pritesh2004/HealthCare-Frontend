import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/service/appointment.service';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  doctorSpecs: any[] = [];

  appointment = {
    doctor_id: 0,
    user_id: 0,
    appointmentDate: '',
    appointmentTime: '',
    bookingDate: Date.now(),
    reason: ''
  }


  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAllDoctorSpec();
  }

  getAllDoctorSpec() {

    this.doctorService.getAllDoctorSpec().subscribe(
      data => {
        this.doctorSpecs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  getDoctorSpecByDoctorId(doctorId: any) {
    this.doctorService.getDoctorSpecializationByDoctorId(doctorId).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  bookAppointment() {
    //to set user_id
    let userStr: any = localStorage.getItem('user');
    if (userStr) {
      let user = JSON.parse(userStr);
      this.appointment.user_id = user.userId;
    } else {
      console.error('User data not found in localStorage.');
    }

    this.appointmentService.bookAppointment(this.appointment).subscribe(
      data => {
        console.log(data);
        alert("Appointment booked successfullt");
      },
      error => {
        console.log(error);
      }
    );

  }

}
