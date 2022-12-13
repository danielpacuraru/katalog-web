import { Component } from '@angular/core';

import { ArticleService } from '../../_services/article.service';
import { Article } from '../../_models/project';

@Component({
  selector: 'edit-article-modal',
  templateUrl: './edit-article-modal.component.html'
})
export class EditArticleModalComponent {

  public show: boolean = false;
  public loading: boolean = false;
  public error: boolean = false;
  public article: Article;
  public group: string;
  public projectId: string;

  constructor(
    private articleService: ArticleService
  ) { }

  public open(article: Article, projectId: string): void {
    this.article = article;
    this.group = article.group ? article.group : '';
    this.projectId = projectId;
    this.loading = false;
    this.show = true;
  }

  public close(): void {
    this.show = false;
  }

  public save(): void {
    if(!this.group) {
      this.error = true;
      return;
    }

    this.loading = true;

    this.articleService
      .update(this.group, this.article.id, this.projectId)
      .subscribe((article: Article) => {
        this.article.group = article.group;
        this.close();
        this.loading = false;
      }, () => {
        this.close();
        this.loading = false;
      });
  }

}
