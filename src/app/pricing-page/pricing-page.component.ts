import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.less']
})
export class PricingPageComponent {

  stripeTest: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stripeService: StripeService,
    private authService: AuthService
  ) {
    this.stripeTest = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        fontFamily: '"aktiv-grotesk", sans-serif',
        fontSize: '20px',
        lineHeight: '32px',
        fontWeight: 500,
        color: '#2C216D',
        '::placeholder': {
          color: '#BABFC8'
        }
      }
    }
  }

  goPay() {


    this.stripeService
      .createPaymentMethod({type: 'card', card: this.card.getCard() })
      .subscribe((result) => {
        if (result.paymentMethod) {
          const method = result.paymentMethod.id;
          // Use the token
          console.log(method);

          this.authService.charge(method).subscribe(data => console.log(data));

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });

  }

}
