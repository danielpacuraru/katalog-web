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
  public article: Article | null = null;

  constructor(
    private articleService: ArticleService
  ) { }

  public open(article: Article): void {
    this.article = article;
    this.show = true;
  }

  public close(): void {
    this.show = false;
  }

}
