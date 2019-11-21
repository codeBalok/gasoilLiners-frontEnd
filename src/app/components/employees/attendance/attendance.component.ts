import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../employees.service';
import { ProjectService } from '../../projects/projects.service';
import { IEmployeeAttendance } from 'src/app/models/employee';

declare const $: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private projectService: ProjectService) { }
  private projects: [IProject];
  private dates = [];
  public search = {
    'Project': 0,
    'EmployeeName': '',
    'EmployeePosition': ''
  };
  public empAttendance: IEmployeeAttendance[];
  public att: IEmployeeAttendance[];
  public employees: any;
  private attendanceParams = [];

  ngOnInit() {
    // for Floating Labels
    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    this.getProjects();
    this.dates = this.Last7Days();
    this.attendanceParams = this.attendance();
  }

  // Get Projects
  public getProjects(): void {
    this.projectService.getProjects().subscribe((data: [IProject]) => {
      this.projects = data;
    });
  }

  // Search Employee
  public searchEmployee(form: FormGroup): void {
    this.search =  {
      'Project': Number(form.value.Project),
      'EmployeeName': form.value.EmployeeName,
      'EmployeePosition': form.value.EmployeePosition
    };
    this.employeeService.searchEmployee(this.search).subscribe((data: any) => {
      this.employees = data;
    });
  }

  // get last 7 days date in reverse order
  public Last7Days () {
    let result = [];
    for (let i = 1; i < 8; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        result.push(d.getDate() + '/' + (d.getMonth() + 1));
    }
    return result.reverse();
  }

  // get attendance parameters
  public attendance() {
    const attendaceParams = ['P', 'A', 'S', 'H', 'E', 'L', 'I', 'C', 'R'];
    return attendaceParams;
  }

  public captureAttendance() {
    const arr = [];
    $('#tblAttendance > tbody > tr').each(function(index, tr) {
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
    });
  }
}
