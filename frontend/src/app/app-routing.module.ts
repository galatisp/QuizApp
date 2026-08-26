import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TestComponent } from './test/test.component';

import { UploadQuestionsComponent } from './admin/upload-questions/upload-questions.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'question',
    component: QuestionComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'admin/upload-questions',
    component: UploadQuestionsComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
