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

 import {MatInputModule} from '@angular/material/input';


import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule } from '@angular/fire/database'
import {AngularFireAuthModule} from '@angular/fire/auth'
import { environment } from 'src/environments/environment';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from './service/user.service';
import { AuthGuard } from './service/auth.guard';

import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';



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
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    RichTextEditorModule

  ],
  providers: [UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
