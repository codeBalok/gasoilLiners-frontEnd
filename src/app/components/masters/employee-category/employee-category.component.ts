import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup } from '@angular/forms';

declare const $: any;

interface IEmployeeCategory {
  category: string;
  description: string;
  status: number;
  id: number;
  createdBy: number;
  createdIp: string;
}

@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.css']
})

export class EmployeeCategoryComponent implements OnInit {

  constructor(private httpService: HttpService) {}

  public rows: any = [];

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
    this.httpService.Get('api/EmployeeCategory').subscribe((data: [IEmployeeCategory]) => {
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
      this.httpService.Post('api/EmployeeCategory', obj).subscribe((data: any) => {
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
      this.httpService.Put('api/EmployeeCategory/' + obj.id, obj).subscribe((data: any) => {
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
      'category': this.editCategory.category,
      'description': this.editCategory.description,
      'status': 0,
      'createdBy': 1,
      'id': this.editCategory.id,
      'createdIp': '0.0.0.1'
    };
    this.httpService.Put('api/EmployeeCategory/' + obj.id, obj).subscribe((data: any) => {
      $('#disable_category').modal('hide');
      this.getCategories();
    });
  }
}
