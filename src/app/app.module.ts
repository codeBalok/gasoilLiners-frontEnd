import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { MyDatePickerModule } from 'mydatepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MorrisJsModule } from 'angular-morris-js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { AllEmployeesComponent } from './components/employees/all-employees/all-employees.component';
import { ProjectCategoryComponent } from './components/masters/project-category/project-category.component';
import { EmployeeCategoryComponent } from './components/masters/employee-category/employee-category.component';
import { AttendanceComponent } from './components/employees/attendance/attendance.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/account/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { ViewDetailsComponent } from './components/employees/view-details/view-details.component';

import { ParseDate } from './pipe/parseDate.pipe';
import { PayOutComponent } from './components/reports/pay-out/pay-out.component';
import { ConfirmDialogComponent } from './components/layouts/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    SidebarComponent,
    HeaderComponent,
    AllEmployeesComponent,
    ProjectCategoryComponent,
    EmployeeCategoryComponent,
    AttendanceComponent,
    DashboardComponent,
    LoginComponent,
    ViewDetailsComponent,
    ParseDate,
    PayOutComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgSlimScrollModule,
    MyDatePickerModule,
    NgxDatatableModule,
    MorrisJsModule,
    AppRoutingModule,
    TooltipModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
