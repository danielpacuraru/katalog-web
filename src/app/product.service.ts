import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/product/${id}`);
  }

  public getProductDoc(id: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiUrl}/product/${id}/doc`, { responseType: 'blob' as 'json' });
  }

  public getCatalog(list: string[]): Observable<void> {
    const params = new HttpParams().set('list', list.join());
    return this.http.get<void>(`${environment.apiUrl}/catalog`, { params: params });
  }

}
