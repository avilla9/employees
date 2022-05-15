import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  AllEmployee: any;
  @Input() subject: Subject<string> | any;
  infos: string[] = [];
  closeResult: any = '';
  employee: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.displayList();
    this.subject.subscribe((text: string) => {
      this.displayList();
    });
  }

  displayList() {
    var list = JSON.parse(localStorage.getItem('list') || '[]');
    if (list?.length) {
      this.AllEmployee = list;
    } else {
      this.AllEmployee = 0;
    }
  }

  delete(data: any) {
    var list = JSON.parse(localStorage.getItem('list') || '[]');
    list.reverse().splice(data, 1);
    localStorage.setItem('list', JSON.stringify(list));
    this.displayList();
  }

  open(content: any, data: any) {
    this.employee = data;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    this.ngOnInit();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  calculateAge(date: any) {
    var today = new Date();
    var birthday = new Date(Date.parse(date));
    var age = today.getFullYear() - birthday.getFullYear();
    var m = today.getMonth() - birthday.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }

    return age;
  }

}