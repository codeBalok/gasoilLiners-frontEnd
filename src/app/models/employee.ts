
interface IEmployeeInfo {
    Id: number;
    EmployeeNumber: string;
    Name: string;
    Age: number;
    Address: string;
    Position: string;
    CategoryId: number;
    StartDate: string;
    EndDate: string;
    Phone: string;
    Email: string;
    DateOfBirth: string;
    Experience: string;
    Notes: string;
    CreatedIP: string;
    CreatedBy: number;
    ProjectId: number;
    Salary: string;
  }
  
  interface IEmployee {
    Id: number;
    EmployeeNumber: string;
    Name: string;
    Age: number;
    Address: string;
    Position: string;
    Category: IEmployeeCategory;
    StartDate: string;
    FinishDate: string;
    Phone: string;
    Email: string;
    DateOfBirth: string;
    Experience: string;
    Notes: string;
    CreatedIP: string;
    Project: IProject;
    Salary: string;
  }
  export interface IEmployeeCategory  {
    Id: number;
    Category: string;
    Description: string;
    Status: number;
    CreatedBy: number;
    CreatedIp: string;
  }
  
  interface IEmployeeProject {
    Id: number;
    EmployeeId: number;
    ProjectId: number;
  }
  
  interface IProject {
    Id: number;
    Title: string;
    Code: string;
  }
  
export interface IEmployeeAttendance {
  Date: string;
  Attendance: string;
  UserId: Number;
  ProjectEmployeeId: Number;
  CreatedIp: string;
}
