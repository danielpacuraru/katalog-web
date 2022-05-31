import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';

import { ProjectService } from '../_services/project.service';
import { ArticleService } from '../_services/article.service';
import { Project, Article, ArticleStatus } from '../_models/project';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.less']
})
export class ProjectPageComponent {

  public project: Project;
  public articles: Article[];
  public articleStatus = ArticleStatus;

  @ViewChild('addArticlesModal') addArticlesModal: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private articleService: ArticleService
  ) {
    this.project = this.route.snapshot.data.project;
    this.articles = this.route.snapshot.data.articles;
  }

  public addArticlesModalOpen(): void {
    this.addArticlesModal.open();
  }

  public buildProject(): void {
    this.projectService.build(this.project.id).subscribe();
  }

  public downloadProject(): void {
    const filename = this.project.name + '.zip';
    this.projectService.download(this.project.id).subscribe(blob => FileSaver.saveAs(blob, filename));
  }

  public updatedArticleId: string = '';

  public updateArticle(group: string) {
    this.articleService.update(group, this.updatedArticleId, this.project.id).subscribe();
  }

  public newArticles(articles: Article[]): void {

    articles.forEach(a => this.articles.unshift(a));
  }

  public deleteArticle(id: string): void {
    this.articleService.delete(id, this.project.id).subscribe(data => console.log(data));
  }

}
