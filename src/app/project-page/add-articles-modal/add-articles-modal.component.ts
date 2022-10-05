import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ArticleService } from '../../_services/article.service';
import { Project, Article } from '../../_models/project';

@Component({
  selector: 'add-articles-modal',
  templateUrl: './add-articles-modal.component.html'
})
export class AddArticlesModalComponent {

  public show: boolean = false;
  public loading: boolean = false;
  public text: string = '';

  @Input()
  public projectId: string = '';

  @Output()
  private create = new EventEmitter<Article[]>();

  constructor(
    private articleService: ArticleService
  ) { }

  public open(): void {
    this.show = true;
    this.loading = false;
    this.text = '';
  }

  public submit(): void {
    const codes = this.textToList(this.text);

    // this.articleService.create(['2456337', '1228195', '6200523'], '63209a60c7fb66d1cba4bb1e').subscribe();
    // this.articleService.create(['2456337', '1228195', '8830486'], '63209a60c7fb66d1cba4bb1e').subscribe();

    this.articleService
      .create(codes, this.projectId)
      .subscribe((articles: Article[]) => {
        this.create.emit(articles);
        this.show = false;
      });
  }

  public close(): void {
    this.show = false;
  }

  private textToList(text: string): string[] {
    const list: string[] = text.split('\n');
    const codes: string[] = [];

    list.forEach(line => {
      const code = line.trim();
      if(code) codes.push(code);
    });

    return codes;
  }

}
