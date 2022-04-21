import { Component, OnInit, ViewChild } from '@angular/core';

import { AdminService } from '../_services/admin.service';
import { Article, ArticleBatch } from '../_models/project';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent implements OnInit {

  public items: Article[] = [];

  @ViewChild('modal1') modal1: any;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getAll().subscribe((data: ArticleBatch) => this.items = data.items);
  }

  openModal1(): void {
    this.modal1.open();
  }

}
