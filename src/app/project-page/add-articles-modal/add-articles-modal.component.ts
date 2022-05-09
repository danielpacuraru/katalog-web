import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ArticleService } from '../../_services/article.service';
import { Project } from '../../_models/project';

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
  private add = new EventEmitter<string[]>();

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

    this.articleService.create(codes, this.projectId).subscribe(data => console.log(data));
    /*this.loading = true;
    this.form.markAllAsTouched();

    if(this.form.invalid) {
      this.loading = false;
      return;
    }

    this.projectService
      .create(this.form.value.name)
      .subscribe((project: Project) => {
        this.create.emit(project);
        this.loading = false;
        this.show = false;
      });*/
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
