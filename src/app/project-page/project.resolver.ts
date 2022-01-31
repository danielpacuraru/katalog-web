import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<Project> {

  constructor(
    private projectService: ProjectService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Project> {
    return this.projectService.get('61ed6c005b4d5a202436e0a2');
  }

}
