import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { User, Auth } from '../_models/auth';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent {

  public loginForm: FormGroup;
  public loginFormLoading: boolean = false;
  public loginFormError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required ]
    });
  }

  public loginFormSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) { return; }

    this.loginFormLoading = true;
    this.loginFormError = false;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((auth: Auth) => {
        this.router.navigateByUrl('/');
        this.loginFormLoading = false;
      }, () => {
        this.loginFormError = true;
        this.loginFormLoading = false;
      });
  }

  public get f() { return this.loginForm.controls; }

}
