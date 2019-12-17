import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../employees.service';
import { ProjectService } from '../../projects/projects.service';
import { IEmployeeAttendance } from 'src/app/models/employee';
import { CommonService } from 'src/app/services/common.service';

declare const $: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private projectService: ProjectService, private commonService: CommonService) { }
  private projects: [IProject];
  public project: '';
  private dates = [];
  private last3Months = [];
  public search = {
    'Project': 0,
    'EmployeeName': '',
    'EmployeePosition': ''
  };
  public empAttendance: IEmployeeAttendance[];
  public att: IEmployeeAttendance[];
  public employees: any;
  public employeeCount = 0;
  private attendanceParams = [];
  private isAttendanceDone = false;
  private today = new Date();

  ngOnInit() {
    // for Floating Labels
    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    });

    this.getProjects();
    this.dates = this.commonService.Last7Days();
    this.attendanceParams = this.commonService.attendance();
    this.last3Months = this.commonService.Last3months();
  }

  // Get Projects
  public getProjects(): void {
    this.projectService.getProjects().subscribe((data: [IProject]) => {
      this.projects = data;
    });
  }

  // Search Employee
  public searchEmployee(): void {
    this.search = {
      'Project': Number(this.project),
      'EmployeeName': '',
      'EmployeePosition': ''
    };
    this.employeeService.searchEmployee(this.search).subscribe((data: any) => {
      this.employees = data.attendance;
      this.isAttendanceDone = (data.attendanceDone > 0) ? true : false;
      if (!this.isAttendanceDone) {
        this.employees.forEach(element => {
          element.todayAttendance = 'P';
        });
      }
      this.employeeCount = this.employees.length;
    });
  }

  public captureAttendance() {
    const arr = [];
    $('#tblAttendance > tbody > tr').each(function (index, tr) {
      arr.push({
        Attendance: $(tr).find('.Attendance-' + index).val(),
        Date: new Date().toDateString(),
        ProjectEmployeeId: Number($(tr).find('.Id-' + index).text()),
        UserId: 1,
        CreatedIp: '0.0.0.1'
      });
    });
    this.empAttendance = arr;
    // send data to api
    this.employeeService.postEmployeeAttendance(this.empAttendance).subscribe((data: any) => {
      console.log(data);
      this.searchEmployee();
    });
  }
}
