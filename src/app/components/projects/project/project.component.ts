import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { ProjectService } from '../projects.service';

declare const $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };

  public rows = [];
  public srch = [];
  public allProjects: Boolean = true;
  public deadline: Boolean = false;
  public addP: any = [];
  public addProject: IProject = {
    'Title': '',
    'Code': '',
    'Description': '',
    'StartDate': '',
    'EndDate': '',
    'Location': '',
    'ProjectCategory': { 'Id': 0, 'Name': '' },
    'ProjectCategoryName': '',
    'Id': 0,
    'CreatedBy': 0,
    'CreatedIP': ''
  };
  public uptP: any = [];
  public viewP: any = [];
  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    this.getProjects();
    this.getProjectCategories();
  }

  public getProjects(): void {
    // Get Projects
    this.projectService.getProjects().subscribe((data: [IProject]) => {
      this.rows = data;
      for (let i = 0; i < this.rows.length; i++) {
        this.rows[i].description = this.rows[i].description.split(/\s+/).slice(0, 25).join(' ');
        if (!isNullOrUndefined(this.rows[i].endDate)) { this.rows[i].endDate = new Date(this.rows[i].endDate).toDateString(); }
      }
    });
  }

  public getProjectCategories(): void {
    // Get Project Categories
    this.projectService.getProjectCategory().subscribe((data: IProjectCategory) => {
      this.addProject.ProjectCategory = data;
    });
  }

  public createProject(form: FormGroup) {
    if (form.valid) {
      // Post Project
      this.projectService.postProject({
          Code: form.value.Code,
          Title: form.value.Title,
          Description: form.value.Description,
          StartDate: form.value.StartDate.jsdate,
          EndDate: form.value.EndDate.jsdate,
          Location: form.value.Location,
          ProjectCategory: form.value.ProjectCategory,
          CreatedBy: 1,
          Id: 0,
          ProjectCategoryName: '',
          CreatedIP: '0.0.0.1'
        }).subscribe((data: IProject) => {
        form.reset();
        $('#create_project').modal('hide');
        this.getProjects();
      });
    }
  }
}
