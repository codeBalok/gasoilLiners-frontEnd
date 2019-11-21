import { Injectable } from '@angular/core';
import { serviceEndpoint } from '../../constants/serviceEndpoint';
import { HttpService } from '../../services/http.service';

@Injectable({
    providedIn: 'root'
  })
export class DashboardService {
    private dashboardEndpoint = serviceEndpoint.dashboardModule;
    constructor(private httpService: HttpService) {}
    // Get Dashboard Data
    public getDashboard() {
        return this.httpService.Get(serviceEndpoint.dashboardModule.getDashboard);
    }
}
