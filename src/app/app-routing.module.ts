import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from "./about.component";
import { HistoryComponent } from "./history.component";
import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login.component";
import { QuestionComponent } from "./question.component";
import { QuizComponent } from "./quiz.component";
import { QuizzesComponent } from "./quizzes.component";
import { UserComponent } from "./user.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "user", component: UserComponent },
  { path: "history", component: HistoryComponent },
  { path: "quizzes", component: QuizzesComponent },
  { path: "quiz", component: QuizComponent },
  { path: "question", component: QuestionComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled",
    }),
  ],
})
export class AppRoutingModule {}
