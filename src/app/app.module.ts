import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassListComponent } from './class/class-list.component';
import { CreateClassComponent } from './class/create-class.component';
import { EditClassComponent } from './class/edit-class.component';
import { UserLoginComponent } from './user/user-login.component';
import { UserRegistrationComponent } from './user/user-registration.component';
import { StudentClassListComponent } from './enrollment/student-class-list.component';
import { ProfessorClassListComponent } from './enrollment/professor-class-list.component';
import { UserClassListComponent } from './class/user-class-list.component';
import { ClassAssignmentListComponent } from './class/class-assignment-list.component';
import { CreateAssignmentComponent } from './assignment/create-assignment.component';
import { EditAssignmentComponent } from './assignment/edit-assignment.component';
import { AssignmentSubmissionListComponent } from './assignment/assignment-submission-list.component';
import { SimilaritySubmissionReportComponent } from './assignment/similarity-submission-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassListComponent,
    CreateClassComponent,
    EditClassComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    StudentClassListComponent,
    ProfessorClassListComponent,
    UserClassListComponent,
    ClassAssignmentListComponent,
    CreateAssignmentComponent,
    EditAssignmentComponent,
    AssignmentSubmissionListComponent,
    SimilaritySubmissionReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
