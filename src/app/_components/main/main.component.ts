import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../_models/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {

  public user: User;
  public userShort: string;

  constructor(
    private route: ActivatedRoute
  ) {
    this.user = this.route.snapshot.data.user;
    this.userShort = this.user.name.split(' ').map(w => w[0]).join('').substring(0, 2);
  }

}
