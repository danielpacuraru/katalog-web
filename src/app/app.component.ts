import { Component } from '@angular/core';

import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public products: Product[] = [];
  public ids: string[] = [];
  public start: boolean = false;

  constructor(
    private productService: ProductService
  ) { }

  public import(): void {
    this.ids = ['2020061', '2020042', '2020026', '3224042', '1606114', '3224173', '3224127', '3224044', '6407219', '8802985'];
    this.start = true;
    this._runProductQueue();
  }

  private _runProductQueue(): void {
    const id = this.ids.shift();

    if(!id) return;

    this.productService
      .getProduct(id)
      .subscribe((product: Product) => {
        console.log(product);
        this.products.push(product);
        this._runProductQueue();
      });
  }

}
