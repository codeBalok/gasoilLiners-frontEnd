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
  public isListView = false;

  public addCategory: IEmployeeCategory = {
    category: '',
    description: '',
    status: 1,
    id: 0,
    createdBy: 1,
    createdIp: '0.0.0.1'
  };

  public editCategory: IEmployeeCategory = {
    category: '',
    description: '',
    status: 1,
    id: 0,
    createdBy: 1,
    createdIp: '0.0.0.1'
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
        'category': form.value.Category,
        'description': form.value.Description,
        'status': 1,
        'createdBy': 1,
        'id': 0,
        'createdIp': '0.0.0.1'
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
        'category': form.value.Category,
        'description': form.value.Description,
        'status': 1,
        'createdBy': 1,
        'id': form.value.Id,
        'createdIp': '0.0.0.1'
      };
      this.employeeService.putEmployeeCategory(obj.id, obj).subscribe((data: any) => {
        form.reset();
        $('#edit_category').modal('hide');
        this.getCategories();
      });
    }
  }

  public onToggleCategory(item: IEmployeeCategory): void {
    this.editCategory = item;
  }

  public toggleCategory(): void {
    const obj: IEmployeeCategory = {
      'category': this.editCategory.category,
      'description': this.editCategory.description,
      'status': this.editCategory.status === 1 ? 0 : 1,
      'createdBy': 1,
      'id': this.editCategory.id,
      'createdIp': '0.0.0.1'
    };
    this.employeeService.putEmployeeCategory(obj.id, obj).subscribe((data: any) => {
      $('#disable_category').modal('hide');
      $('#enable_category').modal('hide');
      this.getCategories();
    });
  }
}
