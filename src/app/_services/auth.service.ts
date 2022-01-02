import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User, Auth } from '../_models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(email: string, password: string): Observable<Auth> {
    return this.http
      .post<Auth>(`${environment.apiUrl}/login`, { email, password })
      .pipe(tap((auth: Auth) => {
        localStorage.setItem('token', auth.token);
        this.user.next(auth.user);
      }));
  }

}
