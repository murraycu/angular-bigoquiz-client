import 'reflect-metadata';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { UserService } from './app/rest-api-clients/user.service';
import { QuizService } from './app/rest-api-clients/quiz.service';
import { QuestionService } from './app/rest-api-clients/question.service';
import { UserHistoryService } from './app/rest-api-clients/user-history.service';
import { QuestionResultsService } from './app/question-results.service';
import { Title, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule),
        UserService,
        QuizService,
        QuestionService,
        UserHistoryService,
        QuestionResultsService,
        Title,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
