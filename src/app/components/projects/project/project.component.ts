import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

interface IProjectCategory {
  Id: number;
  Name: string;
}

interface IProject {
  Id: number;
  Title: string;
  Code: string;
  Description: string;
  Location: string;
  ProjectCategory: IProjectCategory;
  ProjectCategoryName: string;
  StartDate: string;
  EndDate: string;
  CreatedBy: number;
  CreatedIP: string;
}

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
  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getProjects();

    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // Get Project Categories
    this.httpService.Get('api/ProjectCategoryMasters').subscribe((data: IProjectCategory) => {
      this.addProject.ProjectCategory = data;
      console.log(this.addProject.ProjectCategory);
    });
  }

  public getProjects(): void {
    // Get Projects
    this.httpService.Get('api/project').subscribe((data: [IProject]) => {
      console.log(data);
      this.rows = data;
      for (let i = 0; i < this.rows.length; i++) {
        this.rows[i].description = this.rows[i].description.split(/\s+/).slice(0, 25).join(" ");
        if (!isNullOrUndefined(this.rows[i].endDate)) { this.rows[i].endDate = new Date(this.rows[i].endDate).toDateString(); }
      }
    });
  }

  public createProject(form: FormGroup) {
    if (form.valid) {
      let obj: IProject = {
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
      };
      // Post Project
      this.httpService.Post('api/Project', obj).subscribe((data: IProject) => {
        // if (!isNullOrUndefined(data)) {
        //   form.reset();
        //   $('#create_project').modal('hide');
        //   this.getProjects();
        // }
        form.reset();
        $('#create_project').modal('hide');
        this.getProjects();
      });
    }
  }
}
