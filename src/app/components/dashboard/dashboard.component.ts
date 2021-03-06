import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private projectCount: Number = 0;
  private employeeCount: Number = 0;
  constructor(private dashboardService: DashboardService) {
    this.getDashboard();
  }

  ngOnInit() {
  }

  public getDashboard(): void {
    this.dashboardService.getDashboard().subscribe((data: any) => {
      this.projectCount = data.projectCount;
      this.employeeCount = data.employeeCount;
    });
  }
}
