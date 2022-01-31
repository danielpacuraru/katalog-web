import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../_models/project';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.less']
})
export class ProjectPageComponent {

  public project: Project;
  public code: string = '3254915';

  constructor(
    private route: ActivatedRoute
  ) {
    this.project = this.route.snapshot.data.project;
  }

  public addArticle(): void {
    console.log('added');
  }

}
