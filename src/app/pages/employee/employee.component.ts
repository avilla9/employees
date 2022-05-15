import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  subject = new Subject<string>();
  closeResult = '';

  constructor() { }

  ngOnInit(): void {
    this.subject.subscribe((text: string) => {
      console.log(`Received from child component: ${text}`);
    });
  }

  handleInfo = (info: string) => {
    this.subject.next(info);
  }
}
