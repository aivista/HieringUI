import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  title = 'resourcemanagement';
  jobs = [
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: true },
    { title: 'Digital Marketing Manager', location: 'Ahmedabad, Gujarat, India', active: false },
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: false },
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: false },
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: false },
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: false },
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: false },
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: false },
    { title: 'SAS & Communication Manager', location: 'Ahmedabad, Gujarat, India', active: false },
  ];
}
