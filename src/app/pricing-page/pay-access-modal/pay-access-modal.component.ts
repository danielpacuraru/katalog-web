import { Component, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'pay-access-modal',
  templateUrl: './pay-access-modal.component.html'
})
export class PayAccessModalComponent {

  public show: boolean = false;
  public type: string;

  public cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        fontFamily: '"Proxima", sans-serif',
        fontSize: '15px',
        lineHeight: '22px',
        color: '#2D3E4D',
        '::placeholder': {
          color: '#BABFC8'
        }
      }
    }
  }

  public loading: boolean = false;
  public error: string = '';

  constructor(
    private stripeService: StripeService,
    private authService: AuthService
  ) { }

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  onChange() {
    this.error = '';
  }

  open(type: string): void {
    this.type = type;
    this.error = '';
    this.loading = false;
    this.show = true;
  }

  close(): void {
    this.show = false;
    this.loading = false;
  }

  buy() {
    this.loading = true;
    this.error = '';
    this.stripeService
      .createPaymentMethod({
        type: 'card',
        card: this.card.element
      })
      .subscribe((result) => {
        if(result.paymentMethod) {
          const peymentMethodId = result.paymentMethod.id;
          this.authService
            .pay(peymentMethodId)
            .subscribe((data: any) => {
              console.log(data);
              this.loading = false;
            }, (err) => {
              this.error = 'Card declined!';
              this.loading = false;
            });
        }
        else if(result.error) {
          this.error = '' + result.error.message;
          this.loading = false;
        }
      });
  }

}


