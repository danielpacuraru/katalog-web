import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public getProductDoc(): Observable<void> {
    return this.http.get<void>(`${environment.apiUrl}/product/123/doc`);
  }

}
