import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../../employees/employees.service';
import { IEmployeeCategory } from '../../../models/employee';

declare const $: any;

@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.css']
})

export class EmployeeCategoryComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {}

  public rows: any = [];

  public addCategory: IEmployeeCategory = {
    Category: '',
    Description: '',
    Status: 1,
    Id: 0,
    CreatedBy: 1,
    CreatedIp: '0.0.0.1'
  };

  public editCategory: IEmployeeCategory = {
    Category: '',
    Description: '',
    Status: 1,
    Id: 0,
    CreatedBy: 1,
    CreatedIp: '0.0.0.1'
  };

  ngOnInit() {
    this.getCategories();
  }

  public getCategories(): void {
    // Get Employee Categories
    this.employeeService.getEmployeeCategory().subscribe((data: [IEmployeeCategory]) => {
      this.rows = data;
    });
  }

  public createCategory(form: FormGroup): void {
    if (form.valid) {
      const obj: IEmployeeCategory = {
        'Category': form.value.Category,
        'Description': form.value.Description,
        'Status': 1,
        'CreatedBy': 1,
        'Id': 0,
        'CreatedIp': '0.0.0.1'
      };
      this.employeeService.postEmployeeCategory(obj).subscribe((data: any) => {
        form.reset();
        $('#add_category').modal('hide');
        this.getCategories();
      });
    }
  }

  public onEdit(item: IEmployeeCategory): void {
    this.editCategory = item;
  }

  public updateCategory(form: FormGroup): void {
    if (form.valid) {
      const obj: IEmployeeCategory = {
        'Category': form.value.Category,
        'Description': form.value.Description,
        'Status': 1,
        'CreatedBy': 1,
        'Id': form.value.Id,
        'CreatedIp': '0.0.0.1'
      };
      this.employeeService.putEmployeeCategory(obj.Id, obj).subscribe((data: any) => {
        form.reset();
        $('#edit_category').modal('hide');
        this.getCategories();
      });
    }
  }

  public onDisable(item: IEmployeeCategory): void {
    this.editCategory = item;
  }

  public disableCategory(): void {
    const obj: IEmployeeCategory = {
      'Category': this.editCategory.Category,
      'Description': this.editCategory.Description,
      'Status': 0,
      'CreatedBy': 1,
      'Id': this.editCategory.Id,
      'CreatedIp': '0.0.0.1'
    };
    this.employeeService.putEmployeeCategory(obj.Id, obj).subscribe((data: any) => {
      $('#disable_category').modal('hide');
      this.getCategories();
    });
  }
}
