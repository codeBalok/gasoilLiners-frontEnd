import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'util';

declare const $: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  private projects: [IProject];
  public search = {
    'Project': 0,
    'EmployeeName': '',
    'EmployeePosition': ''
  };
  public employees: any;

  ngOnInit() {
    // for Floating Labels
    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
    this.getProjects();
  }

  public getProjects(): void {
    // Get Projects
    this.httpService.Get('api/project').subscribe((data: [IProject]) => {
      this.projects = data;
    });
  }

  public searchEmployee(form: FormGroup): void {
  this.search =  {
    'Project': Number(form.value.Project),
    'EmployeeName': form.value.EmployeeName,
    'EmployeePosition': form.value.EmployeePosition
  };
  console.log(this.search);
  this.httpService.Post('api/Search/Employee', this.search).subscribe((data: any) => {
    console.log(data);
    this.employees = data;
    for (let i = 0; i < this.employees.length; i++) {
      if (!isNullOrUndefined(this.employees[i].startDate)) { 
        this.employees[i].startDate = new Date(this.employees[i].startDate).toDateString(); 
      }
    }
  });
  }
}
