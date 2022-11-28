import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserAccount } from '../_models/auth';

@Component({
  selector: 'pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.less']
})
export class PricingPageComponent {

  user: User;

  constructor(
    private route: ActivatedRoute
  ) {
    if(this.route.parent) { 
      this.user = this.route.parent.snapshot.data.user;
    }
    console.log(this.user);
  }

  @ViewChild('payAccessModal') payAccessModal: any;

  buyWeeklyAccess() {
    this.payAccessModal.open('Weekly');
  }

  buyMonthlyAccess() {
    this.payAccessModal.open('Monthly');
  }

}
