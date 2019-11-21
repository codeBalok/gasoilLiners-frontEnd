import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup } from '@angular/forms';

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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getEmployee();
    this.getProject();
    this.getEmployeeCategory();
  }

  public getProject() {
    // Get Projects
    this.httpService.Get('api/project').subscribe((data: [IProject]) => {
      this.projects = data;
    });
  }

  public getEmployeeCategory() {
    // Get Projects
    this.httpService.Get('api/EmployeeCategory').subscribe((data: [IEmployeeCategory]) => {
      this.categories = data;
    });
   }

  public getEmployee() {
    this.httpService.Get('api/Employee').subscribe((data: [IEmployee]) =>  {
      console.log(data);
      this.rows = data;
    });
  }

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
    this.httpService.Post('api/Employee', obj).subscribe((data: {}) => {
      form.reset();
      $('#add_employee').modal('hide');
      this.getEmployee();
    });
   }

}
