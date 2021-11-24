import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';

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
        docUrl: 'http://localhost:3000/product/123/doc',
        id: '2020026',
        imageUrl: 'https://efobasen.efo.no/API/Produktfiler/Skalert/2020026.jpg?id=1238803&w=1000&h=1000&m=3',
        manufacturer: 'Procab AS',
        name: 'Skjøtehylse skru M 16-95'
      }
    }
  ];
  public start: boolean = false;

  constructor(
    private productService: ProductService
  ) { }

  public paste(): void {
    navigator.clipboard.readText()
      .then(text => this._addIdsAndStartQueue(text))
      .catch(error => console.error('Cannot read clipboard text: ', error));
  }

  public download(id: string): void {
    this.productService
      .getProductDoc(id)
      .subscribe((data: Blob) => {
        const product = this.products.find(p => p.id === id);
        if(product?.data) {
          const fileBlob: Blob = new Blob([data], { type: 'application/pdf' });
          const fileName = `${product.data.id}_${product.data.name}.pdf`;
          FileSaver.saveAs(fileBlob, fileName);
        }
      });
  }

  private _addIdsAndStartQueue(text: string): void {
    this._addIds(text);
    this._startQueue();
    this.start = true;
  }

  private _addIds(text: string): void {
    const ids: string[] = text.split('\n').filter(id => id.trim() != '');

    for(let id of ids) {
      this.products.push({ id, status: 'QUEUE', data: null });
    }
  }

  private _startQueue(): void {
    let nextProduct = this.products.find(p => p.status === 'QUEUE');

    if(!nextProduct) return;

    this.productService
      .getProduct(nextProduct.id)
      .subscribe((product: Product) => {
        if(nextProduct) {
          nextProduct.data = product;
          nextProduct.status = 'SUCCESS';
        }
        this._startQueue();
      }, () => {
        if(nextProduct) {
          nextProduct.status = 'ERROR';
        }
        this._startQueue();
      });
  }

}
