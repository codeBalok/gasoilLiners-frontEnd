import { HttpService } from '../../services/http.service';
import { serviceEndpoint } from '../../constants/serviceEndpoint';
import { Injectable } from '@angular/core';
import { IEmployeeCategory } from 'src/app/models/employee';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class EmployeeService  {
    private employeeEndpoint = serviceEndpoint.employeeModule;
    private employeeCategoryEndpoint = serviceEndpoint.employeeCategoryModule;
    constructor(private httpService: HttpService) {}
    // Get Employee Categories
    public getEmployeeCategory() {
        return this.httpService.Get(this.employeeCategoryEndpoint.getEmployeeCategory);
    }

    // Post Employee Category
  public postEmployeeCategory(obj: IEmployeeCategory) {
    return this.httpService.Post(this.employeeCategoryEndpoint.postEmployeeCategory, obj);
  }

  // Put Employee Category
  public putEmployeeCategory(id: number, obj: IEmployeeCategory) {
    return this.httpService.Put(this.employeeCategoryEndpoint.putEmployeeCategory + id, obj);
  }

    // Get Employees
    public getEmployees() {
        return this.httpService.Get(this.employeeEndpoint.getEmployee);
    }
    // Get Employees
    public getEmployee(id: number) {
      return this.httpService.Get(this.employeeEndpoint.getEmployee + '/' + id);
  }

    // Post Employee
    public postEmployee(obj: any) {
        return this.httpService.Post(this.employeeEndpoint.postEmployee, obj);
    }

    // Post Search Employee
    public searchEmployee(obj: any) {
        return this.httpService.Post(this.employeeEndpoint.searchEmployee, obj);
    }

    public getEmployeeAtendance(empId: Number, month: Number) {
      return this.httpService.Get(this.employeeEndpoint.getEmployeeAttendance + '?empId=' + empId + '&month=' + month);
    }

    // Post Employee Attendance
    public postEmployeeAttendance(obj: any) {
        return this.httpService.Post(this.employeeEndpoint.postEmployeeAttendance, obj);
    }
}
