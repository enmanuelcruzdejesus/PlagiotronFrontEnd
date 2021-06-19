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
import { CreateAssignmentComponent } from './assigment/create-assignment.component';
import { EditAssignmentComponent } from './assigment/edit-assignment.component';
import { AssigmentListComponent } from './class/assigment-list.component';
import { AssigmentSubmssionListComponent } from './assigment/assigment-submssion-list.component';
import { AssigmentSubmissionSimilarityComponent } from './assigment/assigment-submission-similarity.component';

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
    CreateAssignmentComponent,
    EditAssignmentComponent,
    AssigmentListComponent,
    AssigmentSubmssionListComponent,
    AssigmentSubmissionSimilarityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
