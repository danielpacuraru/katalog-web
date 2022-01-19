import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/auth';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {

  constructor(
    private authService: AuthService
  ) { }

  resolve(): Observable<User> {
    return this.authService.me();
  }

}
