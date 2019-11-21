import { HttpService } from '../../services/http.service';
import { serviceEndpoint } from '../../constants/serviceEndpoint';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ProjectService {
    private projectEndpoint = serviceEndpoint.projectModule;
    private projectCategoryEndpoint = serviceEndpoint.projectCategoryModule;
    constructor(private httpService: HttpService) {}

    // Get Project Categories
    public getProjectCategory() {
        return this.httpService.Get(this.projectCategoryEndpoint.getProjectCategory);
    }
    // Post Project Categories
    public postProjectCategory(obj: any) {
        return this.httpService.Post(this.projectCategoryEndpoint.getProjectCategory, obj);
    }
    // Put Project Categories
    public putProjectCategory(id: number, obj: any) {
        return this.httpService.Put(this.projectCategoryEndpoint.getProjectCategory + '/' + id, obj);
    }

    // Get Projects
    public getProjects() {
        return this.httpService.Get(this.projectEndpoint.getProject);
    }

    // Post Project
    public postProject(obj: IProject) {
        return this.httpService.Post(this.projectEndpoint.postProject, obj);
    }
}
