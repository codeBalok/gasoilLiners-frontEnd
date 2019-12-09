
<<<<<<< HEAD
  interface IProjectCategory {
    Id: number;
    Name: string;
  }

=======
interface IProjectCategory {
    Id: number;
    Name: string;
  }
  
>>>>>>> f5c1827d38bb8c41e2a0569919ae28c5dbd5fe5f
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
<<<<<<< HEAD
    CreatedBy: number;
    CreatedIP: string;
=======
    CreatedBy: string;
>>>>>>> f5c1827d38bb8c41e2a0569919ae28c5dbd5fe5f
  }