import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserStatusComponent } from './user-status.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { UserComponent } from './user.component';
import { QuizzesComponent } from './quizzes.component';
import { QuizComponent } from './quiz.component';
import { UserHistorySectionsComponent } from './user-history-sections.component';

import { UserService } from './user.service';
import { QuizService } from './quiz.service';
import { UserHistoryService } from './user-history.service';

@NgModule({
  declarations: [
    AppComponent,
    UserStatusComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    QuizzesComponent,
    QuizComponent,
    UserHistorySectionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    QuizService,
    UserHistoryService
  ],
  bootstrap: [
    AppComponent,
    UserStatusComponent
  ]
})
export class AppModule { }
