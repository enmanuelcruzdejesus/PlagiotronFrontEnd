import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentSubmissionListComponent } from './assignment/assignment-submission-list.component';
import { CreateAssignmentComponent } from './assignment/create-assignment.component';
import { EditAssignmentComponent } from './assignment/edit-assignment.component';
import { SimilaritySubmissionReportComponent } from './assignment/similarity-submission-report.component';
import { ClassAssignmentListComponent } from './class/class-assignment-list.component';
import { ClassListComponent } from './class/class-list.component';
import { CreateClassComponent } from './class/create-class.component';
import { EditClassComponent } from './class/edit-class.component';
import { UserClassListComponent } from './class/user-class-list.component';
import { UserLoginComponent } from './user/user-login.component';
import { UserRegistrationComponent } from './user/user-registration.component';
import { AuthGuard } from './service/auth.guard';
import { StudentClassListComponent } from './enrollment/student-class-list.component';
const routes: Routes =
[
  {path: '' , redirectTo: "/user-class-list" , pathMatch: 'full'},
  {path:'login' , component: UserLoginComponent},
  {path:'register' , component: UserRegistrationComponent},
  {path:'user-class-list' , component: UserClassListComponent,canActivate:[AuthGuard]},
  {path:'class-assignment-list' , component: ClassAssignmentListComponent},
  {path:'class-list' , component: ClassListComponent},
  {path:'create-class' , component: CreateClassComponent},
  {path:'edit-class' , component: EditClassComponent},
  {path:'student-class-list' , component: StudentClassListComponent},
  {path:'create-assignment' , component: CreateAssignmentComponent},
  {path:'edit-assignment' , component: EditAssignmentComponent},
  {path:'assignment-submission-list' , component: AssignmentSubmissionListComponent},
  {path:'similarity-submission-report' , component: SimilaritySubmissionReportComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
