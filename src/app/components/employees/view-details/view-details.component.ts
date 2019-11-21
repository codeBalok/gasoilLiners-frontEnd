import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employees.service';
import { ProjectService } from '../../projects/projects.service';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  private employee: any;
  private projects: any;
  private attendance: any;
  private employeeId: any;
  private advance = {
    'AdvanceDate': '',
    'AdvanceAmount': 0
  };
  private salary = {
    'TotalDays': 29,
    'BaseSalary': 1000,
    'MonthSalary': 29000,
    'AdvanceSalary': 5000,
    'FinalSalary': 24000
  };
  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };
  constructor(private employeeService: EmployeeService, private projectService: ProjectService,
      private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
          this.employeeId = Number(params['id']);
      }
    );
    if (this.employeeId ) {
      this.getEmployee(this.employeeId);
      this.getProjects(this.employeeId);
    }
  }

  public getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe((data: any) =>  {
      this.employee = data;
    });
  }

  public getProjects(id: Number) {
    this.projectService.getProjects().subscribe((data: any) =>  {
      this.projects = data;
    });
  }

  public getAttendance(id: Number) {
    this.employeeService.getEmployeeAtendance(id, 11).subscribe((data: any) =>  {
      this.attendance = data;
    });
  }

  public addAdvance(form: FormGroup) {
    if (form.valid) {
      let obj = {
        'AdvanceDate': form.value.AdvanceDate.jsdate,
        'AdvanceAmount': form.value.AdvanceAmount
      };
      console.log(obj);
      form.reset();
      $('#add_advance_taken').modal('hide');
    }
  }
}
