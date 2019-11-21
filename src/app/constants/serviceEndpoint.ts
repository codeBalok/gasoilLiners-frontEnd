import { environment } from '../../environments/environment';
export const serviceEndpoint =  {
    dashboardModule:  {
        getDashboard: environment.endpoint + 'api/Dashboard'
    },
    accountModule:  {
        postLogin: environment.endpoint + 'api/Account/Login'
    },
    projectModule:  {
        getProject: environment.endpoint + 'api/project',
        postProject: environment.endpoint + 'api/Project',
    },
    projectCategoryModule: {
        getProjectCategory: environment.endpoint + 'api/ProjectCategoryMasters',
        postProjectCategory: environment.endpoint + 'api/ProjectCategoryMasters',
        putProjectCategory: environment.endpoint + 'api/ProjectCategoryMasters/'
    },
    employeeModule:  {
        getEmployee: environment.endpoint + 'api/Employee',
        postEmployee: environment.endpoint + 'api/Employee',
        searchEmployee: environment.endpoint + 'api/Search/Employee',
        postEmployeeAttendance: environment.endpoint + 'api/EmployeeAttendance',
        getEmployeeAttendance: environment.endpoint + 'api/Search/Attendance'
    },
    employeeCategoryModule: {
        getEmployeeCategory: environment.endpoint + 'api/EmployeeCategory',
        postEmployeeCategory: environment.endpoint + 'api/EmployeeCategory',
        putEmployeeCategory: environment.endpoint + 'api/EmployeeCategory/'
    }
};
