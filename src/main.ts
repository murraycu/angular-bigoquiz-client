import 'reflect-metadata';
import { enableProdMode, importProvidersFrom } from '@angular/core';

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
import { UserStatusComponent } from './app/user-status.component';

if (environment.production) {
  enableProdMode();
}

// So we can use <app-root> in index.html.
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
  // So we can use <app-user> in index.html too.
  .then(appRef => appRef.bootstrap(UserStatusComponent))
  .catch(err => console.error(err));

