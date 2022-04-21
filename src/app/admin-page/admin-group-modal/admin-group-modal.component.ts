import { Component } from '@angular/core';

@Component({
  selector: 'admin-group-modal',
  templateUrl: './admin-group-modal.component.html',
  styleUrls: ['./admin-group-modal.component.less']
})
export class AdminGroupModalComponent {

  public isOpen: boolean = false;
  public ids: string = '';
  public group: string = '';

  public open(): void {
    this.isOpen = true;
  }

  public close(): void {
    this.isOpen = false;
  }

  public addProducts(): void {
    console.log(this.ids);
    console.log(this.group);
  }

}
