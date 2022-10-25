import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './_components/main/main.component';
import { UserResolver } from './_components/main/user.resolver';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectResolver } from './project-page/project.resolver';
import { ArticlesResolver } from './project-page/articles.resolver';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';

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
        path: 'pricing',
        component: PricingPageComponent
      },
      {
        path: 'projects',
        component: ProjectsPageComponent
      },
      {
        path: 'projects/:id',
        component: ProjectPageComponent,
        resolve: {
          project: ProjectResolver,
          articles: ArticlesResolver
        }
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'catalog/:uuid',
    component: CatalogPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
