import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/service/doctor.service';
import { DoctorSpecialization } from '../../models/doctorSpecialization.model';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit{

  @Input()
  doctorSpec!: DoctorSpecialization;

  ngOnInit(): void {
      console.log(this.doctorSpec);
  }
  constructor(){}

}