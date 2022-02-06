import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Article } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(projectId: string): Observable<Article[]> {
    return this.http
      .get<Article[]>(`${environment.apiUrl}/projects/${projectId}/articles`);
  }

  /*public get(id: string): Observable<Project> {
    return this.http
      .get<Project>(`${environment.apiUrl}/projects/${id}`);
  }*/

  public create(tag: string, projectId: string): Observable<Article> {
    return this.http
      .post<Article>(`${environment.apiUrl}/projects/${projectId}/articles`, { tag });
  }

}
