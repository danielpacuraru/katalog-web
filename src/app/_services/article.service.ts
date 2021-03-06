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

  public create(codes: string[], projectId: string): Observable<Article[]> {
    return this.http
      .post<Article[]>(`${environment.apiUrl}/projects/${projectId}/articles`, { codes });
  }

  public update(group: string, articleId: string, projectId: string): Observable<Article> {
    return this.http
      .put<Article>(`${environment.apiUrl}/projects/${projectId}/articles/${articleId}`, { group });
  }

  public delete(articleId: string, projectId: string): Observable<Article> {
    return this.http
      .delete<Article>(`${environment.apiUrl}/projects/${projectId}/articles/${articleId}`);
  }

}
