import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"; // For ngModel, used in .html.
import { BrowserModule, Title } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";

import { AboutComponent } from "./about.component";
import { AppComponent } from "./app.component";
import { HistoryComponent } from "./history.component";
import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login.component";
import { QuestionComponent } from "./question.component";
import { QuizComponent } from "./quiz.component";
import { QuizzesComponent } from "./quizzes.component";
import { ServerStatusComponent } from "./server-status.component";
import { UserHistorySectionsComponent } from "./user-history-sections.component";
import { UserStatusComponent } from "./user-status.component";
import { UserComponent } from "./user.component";

import { QuestionService } from "./rest-api-clients/question.service";
import { QuizService } from "./rest-api-clients/quiz.service";
import { UserHistoryService } from "./rest-api-clients/user-history.service";
import { UserService } from "./rest-api-clients/user.service";

import { QuestionResultsService } from "./question-results.service";

@NgModule({ bootstrap: [
        AppComponent,
        UserStatusComponent,
    ],
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
        LoginComponent,
    ], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule], providers: [
        UserService,
        QuizService,
        QuestionService,
        UserHistoryService,
        QuestionResultsService,
        Title,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
