import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${environment.apiUrl}/projects`);
  }

  public get(id: string): Observable<Project> {
    return this.http
      .get<Project>(`${environment.apiUrl}/projects/${id}`);
  }

  public create(name: string): Observable<Project> {
    return this.http
      .post<Project>(`${environment.apiUrl}/projects`, { name });
  }

  public build(id: string): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/projects/${id}/catalog`, { });
  }

  public download(id: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/projects/${id}/catalog`, { responseType: 'blob' as 'json' });
  }

}
