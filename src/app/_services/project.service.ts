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

  public create(project: Project): Observable<Project> {
    const proj = {
      name: project.name
    }
    return this.http
      .post<Project>(`${environment.apiUrl}/projects`, proj);
  }

}
