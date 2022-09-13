import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { User, Auth } from '../_models/auth';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent {

  public signupForm: FormGroup;
  public signupFormLoading: boolean = false;
  public signupFormError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required ],
      name: ['', Validators.required ]
    });
  }

  public signupFormSubmit(): void {
    this.authService
      .signup(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
      .subscribe();

      this.authService
      .signup(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
      .subscribe();

      this.authService
      .signup(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
      .subscribe();
    /*this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) { return; }

    this.signupFormLoading = true;
    this.signupFormError = false;
    this.authService
      .signup(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
      .subscribe(() => {
        this.router.navigateByUrl('/');
        this.loginFormLoading = false;
      }, () => {
        this.loginFormError = true;
        this.loginFormLoading = false;
        console.log('done');
      });*/
  }

  public get f() { return this.signupForm.controls; }

}
