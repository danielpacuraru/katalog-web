import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.less']
})
export class PricingPageComponent {

  @ViewChild('payAccessModal') payAccessModal: any;

  buyWeeklyAccess() {
    this.payAccessModal.open('Weekly');
  }

  buyMonthlyAccess() {
    this.payAccessModal.open('Monthly');
  }

}
