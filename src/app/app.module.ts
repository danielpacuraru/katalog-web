import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminGroupModalComponent } from './admin-page/admin-group-modal/admin-group-modal.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './_components/main/main.component';
import { TokenInterceptor } from './_services/token.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AdminPageComponent,
    AdminGroupModalComponent,
    LoginPageComponent,
    ProjectsPageComponent,
    ProjectPageComponent
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
