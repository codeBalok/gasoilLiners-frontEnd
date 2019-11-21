
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
    CreatedBy: string;
  }