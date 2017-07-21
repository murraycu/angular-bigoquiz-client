import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { UserComponent } from './user.component';
import { HistoryComponent } from './history.component';
import { QuizzesComponent } from './quizzes.component';
import { QuizComponent } from './quiz.component';
import { QuestionComponent } from './question.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user', component: UserComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'question', component: QuestionComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
