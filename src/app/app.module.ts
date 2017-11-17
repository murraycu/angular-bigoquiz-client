import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // For ngModel, used in .html.

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserStatusComponent } from './user-status.component';
import { ServerStatusComponent } from './server-status.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { UserComponent } from './user.component';
import { HistoryComponent } from './history.component';
import { QuizzesComponent } from './quizzes.component';
import { QuizComponent } from './quiz.component';
import { QuestionComponent } from './question.component';
import { UserHistorySectionsComponent } from './user-history-sections.component';
import { LoginComponent } from './login.component';

import { UserService } from './rest-api-clients/user.service';
import { QuizService } from './rest-api-clients/quiz.service';
import { QuestionService } from './rest-api-clients/question.service';
import { UserHistoryService } from './rest-api-clients/user-history.service';

import { QuestionResultsService } from './question-results.service';

@NgModule({
  declarations: [
    AppComponent,
    UserStatusComponent,
    ServerStatusComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    HistoryComponent,
    QuizzesComponent,
    QuizComponent,
    QuestionComponent,
    UserHistorySectionsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    QuizService,
    QuestionService,
    UserHistoryService,
    QuestionResultsService,
    Title
  ],
  bootstrap: [
    AppComponent,
    UserStatusComponent
  ]
})
export class AppModule { }
