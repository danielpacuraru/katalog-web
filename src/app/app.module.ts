import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './_components/main/main.component';
import { TokenInterceptor } from './_services/token.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';

import { AddProjectModalComponent } from './projects-page/add-project-modal/add-project-modal.component';
import { AddArticlesModalComponent } from './project-page/add-articles-modal/add-articles-modal.component';

import { BytesPipe } from './_helpers/bytes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginPageComponent,
    ProjectsPageComponent,
    ProjectPageComponent,
    AddProjectModalComponent,
    AddArticlesModalComponent,
    CatalogPageComponent,
    BytesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
