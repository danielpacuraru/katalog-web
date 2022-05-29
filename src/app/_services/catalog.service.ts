import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Catalog } from '../_models/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: string): Observable<Catalog> {
    return this.http
      .get<Catalog>(`${environment.apiUrl}/projects/${id}/catalog`);
  }

}
