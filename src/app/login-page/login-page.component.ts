import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent {

  public loginForm: FormGroup= this.formBuilder.group({
    email: ['pacurarudaniel@gmail.com', [ Validators.required, Validators.email ]],
    password: ['1234', Validators.required ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  public get f() { return this.loginForm.controls; }

  public submit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe();
  }

}
