import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';

import { ProjectService } from '../_services/project.service';
import { ArticleService } from '../_services/article.service';
import { Project, Article, ArticleStatus, ArticleBox } from '../_models/project';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.less']
})
export class ProjectPageComponent {

  public project: Project;
  public articles: ArticleBox[];
  public codes: string = '';
  public codesList: string[] = [];

  @ViewChild('addArticlesModal') addArticlesModal: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private articleService: ArticleService
  ) {
    this.project = this.route.snapshot.data.project;
    this.articles = this.route.snapshot.data.articles.map((article: Article) => { return { code: article.code, status: ArticleStatus.SUCCESS, data: article } });
  }

  public addArticlesModalOpen(): void {
    this.addArticlesModal.open();
  }

  public addArticles(): void {
    this.codesList = [];

    const list = this.codes.split('\n');
    list.forEach(c => {
      const code = c.trim();
      if(code) this.articles.unshift({ code, status: ArticleStatus.QUEUED });
    });

    this.syncArticles();
  }

  public syncArticles(): void {
    const nextArticle: ArticleBox | undefined = this.articles.find((article: ArticleBox) => article.status === ArticleStatus.QUEUED);

    if(!nextArticle) return;

    /*this.articleService
      .create(nextArticle.code, this.project.id)
      .subscribe((article: Article) => {
        nextArticle.status = ArticleStatus.SUCCESS;
        nextArticle.data = article;
        this.syncArticles();
      }, (error) => {
        console.log(error);
        if(error.status === 409) {
          nextArticle.status = ArticleStatus.DUPLICATE;
          console.log('conflict');
        }
        else if (error.status === 404) {
          nextArticle.status = ArticleStatus.MISSING;
          console.log('missing');
        }
        this.syncArticles();
      });*/
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

}
