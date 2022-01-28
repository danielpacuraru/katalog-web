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

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  public projects = [
    {
      name: 'Prodigy Corp.'
    },
    {
      name: 'Bookface SA'
    },
    {
      name: 'Tweester Org.'
    }
  ];

  public show: boolean = false;

  public newProject(): void {
    this.show = true;
  }

  public project = {
    name: 'LinkedIn HQ',
    title: 'LinkedIn',
    description: 'Katalog for LinkedIn.'
  }

  public goProject(): void {
    this.projectService
      .create(this.project)
      .subscribe((project: Project) => {
        const id = project.id;
        this.router.navigateByUrl(`/projects/${id}`);
      });
  }

}
