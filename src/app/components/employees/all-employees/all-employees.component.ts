import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employees.service';
import { ProjectService } from '../../projects/projects.service';
import { CommonService } from 'src/app/services/common.service';

interface IEmployeeInfo {
  Id: number;
  EmployeeNumber: string;
  Name: string;
  Age: number;
  Address: string;
  Position: string;
  CategoryId: number;
  StartDate: string;
  EndDate: string;
  Phone: string;
  Email: string;
  DateOfBirth: string;
  Experience: string;
  Notes: string;
  CreatedIP: string;
  CreatedBy: number;
  ProjectId: number;
  Salary: string;
}

interface IEmployee {
  Id: number;
  EmployeeNumber: string;
  Name: string;
  Age: number;
  Address: string;
  Position: string;
  Category: IEmployeeCategory;
  StartDate: string;
  FinishDate: string;
  Phone: string;
  Email: string;
  DateOfBirth: string;
  Experience: string;
  Notes: string;
  CreatedIP: string;
  Project: IProject;
  Salary: string;
}
interface IEmployeeCategory  {
  Id: number;
  Category: string;
}

interface IEmployeeProject {
  Id: number;
  EmployeeId: number;
  ProjectId: number;
}

interface IProject {
  Id: number;
  Title: string;
  Code: string;
}
declare const $: any;
@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };

  public employee: IEmployee = {
    Address: '',
    Age: 0,
    Category: { Id: 0, Category: ''},
    CreatedIP: '',
    DateOfBirth: '',
    Email: '',
    EmployeeNumber: '',
    Experience: '',
    Id: 0,
    Name: '',
    Notes: '',
    Phone: '',
    Position: '',
    StartDate: '',
    FinishDate: '',
    Salary:'',
    Project: { Id: 0, Code: '', Title: ''},
  };

   public rows = [];
   public projects = [];
   public categories = [];

  constructor(private employeeService: EmployeeService, private router: Router, 
      private projectService: ProjectService) { }

  ngOnInit() {
    this.getEmployee();
    this.getProject();
    this.getEmployeeCategory();
  }

  // Get Projects
  public getProject() {
    this.projectService.getProjects().subscribe((data: [IProject]) => {
      this.projects = data;
    });
  }

  // Get Employee Categories
  public getEmployeeCategory() {
    this.employeeService.getEmployeeCategory().subscribe((data: [IEmployeeCategory]) => {
      this.categories = data;
    });
   }

  // Get Employees
  public getEmployee() {
    this.employeeService.getEmployees().subscribe((data: [IEmployee]) =>  {
      this.rows = data;
    });
  }

  // add new employee
  public addEmployee(form: FormGroup) {
    let obj: IEmployeeInfo =  {
      Address: form.value.Address,
      Age: form.value.Age,
      CategoryId: form.value.Category,
      CreatedBy: 1,
      CreatedIP: '0.0.0.1',
      DateOfBirth: form.value.StartDate.jsdate,
      Email: form.value.Email,
      EmployeeNumber: form.value.EmployeeNumber,
      Experience: form.value.Experience,
      EndDate: form.value.FinishDate.jsdate,
      Id: 0,
      Name: form.value.Name,
      Notes: form.value.Notes,
      Phone: form.value.Phone,
      Position: form.value.Category.toString(),
      ProjectId: form.value.Project,
      Salary: form.value.Salary,
      StartDate: form.value.StartDate.jsdate
    };
    this.employeeService.postEmployee(obj).subscribe((data: {}) => {
      form.reset();
      $('#add_employee').modal('hide');
      this.getEmployee();
    });
   }

  public employeeDetails(id: Number) {
    this.router.navigate(['employees/view-details/' + id]);
  }

}
