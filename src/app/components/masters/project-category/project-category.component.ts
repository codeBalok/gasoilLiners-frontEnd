import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectService } from '../../projects/projects.service';

declare const $: any;

interface IProjectCategory {
  name: string;
  description: string;
  status: number;
  id: number;
  createdBy: number;
  createdIp: string;
}

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.css']
})
export class ProjectCategoryComponent implements OnInit {

  constructor(private projectService: ProjectService) {}

  public rows: any = [];

  public addCategory: IProjectCategory = {
    name: '',
    description: '',
    status: 1,
    id: 0,
    createdBy: 1,
    createdIp: '0.0.0.1'
  };

  public editCategory: IProjectCategory = {
    name: '',
    description: '',
    status: 1,
    id: 0,
    createdBy: 1,
    createdIp: '0.0.0.1'
  };

  ngOnInit() {
    this.getCategories();
  }

  // Get Employee Categories
  public getCategories(): void {
    this.projectService.getProjectCategory().subscribe((data: [IProjectCategory]) => {
      this.rows = data;
    });
  }

  public createCategory(form: FormGroup): void {
    if (form.valid) {
      const obj: IProjectCategory = {
        'name': form.value.Name,
        'description': form.value.Description,
        'status': 1,
        'createdBy': 1,
        'id': 0,
        'createdIp': '0.0.0.1'
      };
      this.projectService.postProjectCategory(obj).subscribe((data: any) => {
        form.reset();
        $('#add_category').modal('hide');
        this.getCategories();
      });
    }
  }

  public onEdit(item: IProjectCategory): void {
    this.editCategory = item;
  }

  public updateCategory(form: FormGroup): void {
    if (form.valid) {
      const obj: IProjectCategory = {
        'name': form.value.Name,
        'description': form.value.Description,
        'status': 1,
        'createdBy': 1,
        'id': form.value.Id,
        'createdIp': '0.0.0.1'
      };
      this.projectService.putProjectCategory(obj.id, obj).subscribe((data: any) => {
        form.reset();
        $('#edit_category').modal('hide');
        this.getCategories();
      });
    }
  }

  public onToggleCategory(item: IProjectCategory): void {
    this.editCategory = item;
  }

  public toggleCategory(): void {
    const obj: IProjectCategory = {
      'name': this.editCategory.name,
      'description': this.editCategory.description,
      'status': this.editCategory.status === 1 ? 0 : 1,
      'createdBy': 1,
      'id': this.editCategory.id,
      'createdIp': '0.0.0.1'
    };
    this.projectService.putProjectCategory(obj.id, obj).subscribe((data: any) => {
      $('#disable_category').modal('hide');
      $('#enable_category').modal('hide');
      this.getCategories();
    });
  }

}

