import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  exists = false;
  updateValidation: any;
  departments = [
    {
      name: 'Administración',
      value: 'Administración',
    },
    {
      name: 'Tienda',
      value: 'Tienda'
    },
    {
      name: 'Contabilidad',
      value: 'Contabilidad'
    }
  ];

  @Input()
  content: any = false;

  @Output() onInfo: EventEmitter<string> = new EventEmitter<string>();
  text: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      lastName: ['', [Validators.maxLength(50), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      department: [''],
      birthday: [''],
    });
  }

  ngOnInit(): void { }

  get f() { return this.form.controls }

  submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.create(this.form.value);
    }
  }

  create(data: any) {
    if (!localStorage.getItem('list')?.length) {
      console.log('not Exists');
      localStorage.setItem('list', JSON.stringify([data]));
      this.sendInfo();
    } else if (!this.checkDni(data.dni)) {
      console.log('DNI Exists');
      this.exists = true;
    } else {
      console.log('Creating');
      var list = JSON.parse(localStorage.getItem('list') || '[]');
      localStorage.setItem('list', JSON.stringify([...list, data]));
      this.exists = false;
      this.sendInfo();
    }
  }

  checkDni(data: any) {
    var list = JSON.parse(localStorage.getItem('list') || '[]');
    for (let i = 0; i < list.length; i++) {
      const employee = list[i];
      if (employee.dni == data) {
        return false;
      }
    }
    return true;
  }

  sendInfo = (): void => {
    this.onInfo.emit('action');
    this.text = "";
  }

  cleanForm() {
    this.form.reset();
  }

  updateInfo(data: any) {
    this.submitted = true;
    var list = JSON.parse(localStorage.getItem('list') || '[]');
    for (let i = 0; i < list.length; i++) {
      const employee = list[i];
      if (employee.dni == data.dni) {
        employee.dni = data.dni;
        employee.name = this.form.value['name']?.length > 3 ? this.form.value['name'] : employee.name;
        employee.lastName = this.form.value['lastName'];
        employee.email = data.email;
        employee.birthday = this.form.value['birthday'];
        employee.department = this.form.value['department'];
      }
    }
    localStorage.setItem('list', JSON.stringify(list));
    this.sendInfo();
  }
}
