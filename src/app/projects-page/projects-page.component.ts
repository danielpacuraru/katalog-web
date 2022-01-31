import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';

@Component({
  selector: 'projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.less']
})
export class ProjectsPageComponent {

  public projects: Project[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
    this.projectService
      .getAll()
      .subscribe((projects: Project[]) => this.projects = projects);
  }

  public show: boolean = false;

  public newProject(): void {
    this.show = true;
  }

  public project = {
    name: 'LinkedIn HQ'
  }

  public goProject(): void {
    this.projectService
      .create(this.project.name)
      .subscribe((project: Project) => {
        const id = project.id;
        this.router.navigateByUrl(`/projects/${id}`);
      });
  }

}
