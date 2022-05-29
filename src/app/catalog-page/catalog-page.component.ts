import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CatalogService } from '../_services/catalog.service';
import { Catalog } from '../_models/catalog';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.less']
})
export class CatalogPageComponent {

  public catalog: Catalog | undefined;
  public error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {
    const uuid: string = this.route.snapshot.params['uuid'];
    this.catalogService.get(uuid).subscribe((catalog: Catalog) => this.catalog = catalog, () => this.error = true);
  }

}
