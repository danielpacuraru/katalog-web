import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ArticleService } from '../_services/article.service';
import { Article } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ArticlesResolver implements Resolve<Article[]> {

  constructor(
    private articleService: ArticleService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Article[]> {
    const projectId: string = route.params['id'];
    return this.articleService.getAll(projectId);
  }

}
