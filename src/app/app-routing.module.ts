import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/account/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { AllEmployeesComponent } from './components/employees/all-employees/all-employees.component';
import { AttendanceComponent } from './components/employees/attendance/attendance.component';
import { EmployeeCategoryComponent } from './components/masters/employee-category/employee-category.component';
import { ProjectCategoryComponent } from './components/masters/project-category/project-category.component';
import { ViewDetailsComponent } from './components/employees/view-details/view-details.component';
import { PayOutComponent } from './components/reports/pay-out/pay-out.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'employees/all-employees', component: AllEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'employees/attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'employees/view-details/:id', component: ViewDetailsComponent, canActivate: [AuthGuard] },
  { path: 'masters/employee-category', component: EmployeeCategoryComponent, canActivate: [AuthGuard] },
  { path: 'masters/project-category', component: ProjectCategoryComponent, canActivate: [AuthGuard] },
  { path: 'reports/pay-out', component: PayOutComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }