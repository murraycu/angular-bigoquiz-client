import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; // For ngModel, used in .html.

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserStatusComponent } from './user-status.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { UserComponent } from './user.component';
import { HistoryComponent } from './history.component';
import { QuizzesComponent } from './quizzes.component';
import { QuizComponent } from './quiz.component';
import { QuestionComponent } from './question.component';
import { UserHistorySectionsComponent } from './user-history-sections.component';

import { UserService } from './user.service';
import { QuizService } from './quiz.service';
import { QuestionService } from './question.service';
import { UserHistoryService } from './user-history.service';

@NgModule({
  declarations: [
    AppComponent,
    UserStatusComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    HistoryComponent,
    QuizzesComponent,
    QuizComponent,
    QuestionComponent,
    UserHistorySectionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    QuizService,
    QuestionService,
    UserHistoryService
  ],
  bootstrap: [
    AppComponent,
    UserStatusComponent
  ]
})
export class AppModule { }
