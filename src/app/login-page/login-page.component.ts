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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['pacurarudaniel@gmail.com', [ Validators.required, Validators.email ]],
      password: ['123', Validators.required ]
    });
  }

  public submit(): void {
    const { email, password } = this.loginForm.value;

    this.authService
      .login(email, password)
      .subscribe((auth: Auth) => {
        this.router.navigateByUrl('/');
      }, () => {
        console.log('error');
      });
  }

}
