import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { groupBy } from 'lodash';
import { Clipboard } from '@angular/cdk/clipboard';

import { ProjectService } from '../_services/project.service';
import { ArticleService } from '../_services/article.service';
import { CatalogService } from '../_services/catalog.service';
import { Project, Article, ArticleStatus, Catalog, ProjectStatus } from '../_models/project';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.less']
})
export class ProjectPageComponent implements OnDestroy {

  public project: Project;
  public articles: Article[];
  public catalog: Catalog | null = null;
  public articleStatus = ArticleStatus;
  public building: boolean = false;
  public active: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard,
    private projectService: ProjectService,
    private articleService: ArticleService,
    private catalogService: CatalogService
  ) {
    this.active = true;
    this.project = this.route.snapshot.data.project;
    this.articles = this.route.snapshot.data.articles;
    this.checkUpdates();
    this.getCatalog();
    
  }

  ngOnDestroy() {
    this.active = false;
  }

  private syncCatalog(): void {
    if(!this.active) return;

    this.projectService
      .get(this.project.id)
      .subscribe((project: Project) => {
        this.project = project;
        if(this.project.status === 'QUEUE') {
          setTimeout(() => { this.syncCatalog(); }, 2500);
        }
        else {
          this.getCatalog();
        }
      });
  }

  @ViewChild('confirmDeleteArticle') confirmDeleteArticle: any;
  @ViewChild('confirmDeleteProject') confirmDeleteProject: any;

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

  private getCatalog(): void {
    this.catalogService.get(this.project.id).subscribe((catalog: Catalog) => { this.catalog = catalog; });
  }

  public get catalogSync() { return this.project.status === ProjectStatus.QUEUE }

  public isArticlePartial(article: Article): boolean {
    return !article.group;
  }

  public addArticles(articles: Article[]): void {
    articles.forEach((article: Article) => this.articles.unshift(article));
    this.checkUpdates();
  }

  public buildProject(): void {
    this.catalog = null;
    this.project.status = ProjectStatus.QUEUE;
    this.catalogService
      .build(this.project.id)
      .subscribe(() => this.syncCatalog());
  }

  public deleteArticle(article: Article): void {
    const title = 'Delete article?';
    const text = `Article: ${article.name}`;
    this.confirmDeleteArticle.open(title, text).then(() => this._deleteArticle(article), () => {});
  }

  private _deleteArticle(article: Article): void {
    this.articleService
      .delete(article.id, this.project.id)
      .subscribe(() => {
        this.articles = this.articles.filter((a: Article) => a.id !== article.id);
      });
  }

  public copyCodes(): void {
    const codes = this.articles.filter(a => a.status === ArticleStatus.ERROR).map(a => a.code);
    const text = codes.join('\n');
    this.clipboard.copy(text);
  }

  public deleteProject(): void {
    const title = 'Delete project?';
    const text = `This action cannot be undone!`;
    this.confirmDeleteProject.open(title, text).then(() => this._deleteProject(), () => {});
  }

  private _deleteProject(): void {
    this.projectService.delete(this.project.id).subscribe(() => this.router.navigate(['..'], { relativeTo: this.route }));
  }

}
