import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';

import { ProjectService } from '../_services/project.service';
import { ArticleService } from '../_services/article.service';
import { Project, Article } from '../_models/project';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.less']
})
export class ProjectPageComponent {

  public project: Project;
  public articles: Article[];
  public tag: string = '3254915';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private articleService: ArticleService
  ) {
    this.project = this.route.snapshot.data.project;
    this.articles = this.route.snapshot.data.articles;
  }

  public addArticle(): void {
    this.articleService.create(this.tag, this.project.id).subscribe((article: Article) => this.articles.push(article));
  }

  public buildProject(): void {
    this.projectService.build(this.project.id).subscribe();
  }

  public downloadProject(): void {
    const filename = `${this.project.name}.pdf`;
    this.projectService.download(this.project.id).subscribe(blob => FileSaver.saveAs(blob, filename));
  }

}
