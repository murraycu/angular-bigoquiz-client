import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { QuizzesComponent } from './quizzes.component';
import { QuizComponent } from './quiz.component';
import { UserHistorySectionsComponent } from './user-history-sections.component';

import { QuizService } from './quiz.service';
import { UserHistoryService } from './user-history.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
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
    QuizService,
    UserHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
