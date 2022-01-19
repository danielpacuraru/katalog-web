import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './_components/main/main.component';
import { UserResolver } from './_components/main/user.resolver';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'projects'
      },
      {
        path: 'projects',
        component: ProjectsPageComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
