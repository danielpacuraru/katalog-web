import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { ArticleBatch } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<ArticleBatch> {
    return this.http
      .get<ArticleBatch>(`${environment.apiUrl}/items`);
  }

}
