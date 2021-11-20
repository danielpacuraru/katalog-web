import { Component } from '@angular/core';

import { ProductService } from './product.service';
import { Product, ProductBox } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public products: ProductBox[] = [
    {
      id: '2020061',
      status: 'SUCCESS',
      data: {
        docUrl: 'https://efobasen.efo.no/API/Produktfiler/LastNed?id=1057723',
        id: '2020061',
        imageUrl: 'https://efobasen.efo.no/API/Produktfiler/Skalert/2020061.jpg?id=30426&w=1000&h=1000&m=3',
        manufacturer: 'Cembre',
        name: 'Dyp-presstang HN5'
      }
    },
    {
      id: '2020042',
      status: 'SUCCESS',
      data: {
        docUrl: 'https://efobasen.efo.no/API/Produktfiler/LastNed?id=1057728',
        id: '2020042',
        imageUrl: 'https://efobasen.efo.no/API/Produktfiler/Skalert/2020042.jpg?id=27102&w=1000&h=1000&m=3',
        manufacturer: 'Procab AS',
        name: 'C-press klemme C25-C25'
      }
    },
    {
      id: '2020026',
      status: 'SUCCESS',
      data: {
        docUrl: 'https://efobasen.efo.no/API/Produktfiler/LastNed?id=1238802',
        id: '2020026',
        imageUrl: 'https://efobasen.efo.no/API/Produktfiler/Skalert/2020026.jpg?id=1238803&w=1000&h=1000&m=3',
        manufacturer: 'Procab AS',
        name: 'Skjøtehylse skru M 16-95'
      }
    }
  ];
  public start: boolean = true;

  constructor(
    private productService: ProductService
  ) { }

  public import(): void {
    const ids: string[] = ['8001115', '2020061', '2020042', '2020026', '3224042', '1606114', '3224173', '3224127', '3224044', '6407219', '8802985'];
    for(let id of ids) this.products.push({ id, status: 'QUEUE', data: null });
    console.log(this.products);
    this.start = true;
    this._runProductQueue();
  }

  public download(): void {
    this.productService
      .getProductDoc()
      .subscribe();
  }

  private _runProductQueue(): void {
    let nextProduct = this.products.find(p => p.status === 'QUEUE');

    if(!nextProduct) return;

    this.productService
      .getProduct(nextProduct.id)
      .subscribe((product: Product) => {
        console.log(product);
        if(nextProduct) {
          nextProduct.data = product;
          nextProduct.status = 'SUCCESS';
        }
        this._runProductQueue();
      });
  }

}
