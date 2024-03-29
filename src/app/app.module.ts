import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './_components/main/main.component';
import { AuthInterceptor } from './_services/auth.interceptor';
import { TokenInterceptor } from './_services/token.interceptor';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';

import { PayAccessModalComponent } from './pricing-page/pay-access-modal/pay-access-modal.component';
import { AddProjectModalComponent } from './projects-page/add-project-modal/add-project-modal.component';
import { AddArticlesModalComponent } from './project-page/add-articles-modal/add-articles-modal.component';
import { EditArticleModalComponent } from './project-page/edit-article-modal/edit-article-modal.component';
import { EditProjectModalComponent } from './project-page/edit-project-modal/edit-project-modal.component';

import { ConfirmComponent } from './_components/confirm/confirm.component';
import { DropdownDirective } from './_helpers/dropdown.directive';
import { BytesPipe } from './_helpers/bytes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginPageComponent,
    SignupPageComponent,
    PricingPageComponent,
    ProjectsPageComponent,
    ProjectPageComponent,
    PayAccessModalComponent,
    AddProjectModalComponent,
    AddArticlesModalComponent,
    EditArticleModalComponent,
    EditProjectModalComponent,
    CatalogPageComponent,
    ConfirmComponent,
    DropdownDirective,
    BytesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ClipboardModule,
    NgxStripeModule.forRoot(environment.stripeKey),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
