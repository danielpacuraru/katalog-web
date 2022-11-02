import { Component, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';

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

  constructor(private stripeService: StripeService) { }

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  open(type: string): void {
    this.type = type;
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

  buy() {
    this.stripeService
      .createPaymentMethod({type: 'card', card: this.card.getCard() })
      .subscribe((result) => {
        if (result.paymentMethod) {
          const method = result.paymentMethod.id;
          // Use the token
          console.log(method);


        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}


