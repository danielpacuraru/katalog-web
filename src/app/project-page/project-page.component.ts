import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public copy: string = 'https';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private articleService: ArticleService
  ) {
    this.project = this.route.snapshot.data.project;
    this.articles = this.route.snapshot.data.articles;
    this.checkUpdates();
  }

  @ViewChild('confirmDeleteArticle') confirmDeleteArticle: any;

  public get successCount(): number { return this.articles.filter(a => a.status === ArticleStatus.SUCCESS && a.group).length; }
  public get incompleteCount(): number { return this.articles.filter(a => a.status === ArticleStatus.SUCCESS && !a.group).length; }
  public get errorCount(): number { return this.articles.filter(a => a.status === ArticleStatus.ERROR).length; }
  public get queueCount(): number { return this.articles.filter(a => a.status === ArticleStatus.QUEUE).length; }
  public get percentageValue(): number { return this.articles.length > 0 ? Math.floor(100 - (this.queueCount * 100 / this.articles.length)) : 100; }

  public checkUpdates(): void {
    if(this.queueCount > 0) {
      this.articleService
        .getAll(this.project.id)
        .subscribe((articles: Article[]) => {
          this.articles = articles;
          setTimeout(() => {
            this.checkUpdates();
          }, 3000);
        });
    }
  }

  public isArticlePartial(article: Article): boolean {
    return !article.group;
  }

  public addArticles(articles: Article[]): void {
    articles.forEach((article: Article) => this.articles.unshift(article));
    this.checkUpdates();
  }

  public buildProject(): void {
    this.projectService.build(this.project.id).subscribe();
  }

  public downloadProject(): void {
    const filename = this.project.name + '.zip';
    this.projectService.download(this.project.id).subscribe(blob => FileSaver.saveAs(blob, filename));
  }

  public deleteProject(): void {
    this.projectService.delete(this.project.id).subscribe(() => this.router.navigate(['..'], { relativeTo: this.route }));
  }

  /*public updatedArticleId: string = '';

  public updateArticle(group: string) {
    this.articleService.update(group, this.updatedArticleId, this.project.id).subscribe();
  }

  public newArticles(articles: Article[]): void {

    articles.forEach(a => this.articles.unshift(a));
  }*/

  public deleteArticle(article: Article): void {
    /*var result = confirm(`Are you sure you want to delete "${article.name}" ?`);
    if(result) {
      this.articleService.delete(article.id, this.project.id).subscribe(data => this.articles = this.articles.filter(a => a.id !== data.id));
    }*/
    const title = 'Delete article?';
    const text = `Article: ${article.name}`;
    this.confirmDeleteArticle.open(title, text).then(() => this._deleteArticle(article), () => {});
  }

  private _deleteArticle(article: Article): void {
    this.articleService
      .delete(article.id, this.project.id)
      .subscribe((data: Article) => {
        this.articles = this.articles.filter((article: Article) => article.id !== data.id);
      });
  }

}
