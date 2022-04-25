import { Component, ViewChild } from '@angular/core';
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

  @ViewChild('createProjectModal') createProjectModal: any;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
    this.projectService
      .getAll()
      .subscribe((projects: Project[]) => this.projects = projects);
  }

  public createProjectModalOpen(): void {
    this.createProjectModal.open();
  }

  public newProject(project: Project): void {
    this.projects.push(project);
    this.router.navigateByUrl(`/projects/${project.id}`);
  }

}
