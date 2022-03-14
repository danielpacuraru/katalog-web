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
  public codes: string = '';
  public codesList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private articleService: ArticleService
  ) {
    this.project = this.route.snapshot.data.project;
    this.articles = this.route.snapshot.data.articles;
  }

  public addArticles(): void {
    this.codesList = [];

    const list = this.codes.split('\n');
    list.forEach(c => {
      const code = c.trim();
      if(code) this.codesList.push(code);
    });

    this.addArticle();
  }

  public addArticle(): void {
    if(!this.codesList.length) return;

    this.articleService
      .create(this.codesList[0], this.project.id)
      .subscribe((article: Article) => {
        this.articles.push(article);
        this.addArticle();
      }, () => {
        this.addArticle();
      });

    this.codesList.shift();
  }

  public buildProject(): void {
    this.projectService.build(this.project.id).subscribe();
  }

  public downloadProject(): void {
    const filename = `${this.project.name}.pdf`;
    this.projectService.download(this.project.id).subscribe(blob => FileSaver.saveAs(blob, filename));
  }

  public updatedArticleId: string = '';

  public updateArticle(group: string) {

    this.articleService.update(group, this.updatedArticleId, this.project.id).subscribe();

  }

}
