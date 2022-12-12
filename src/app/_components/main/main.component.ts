import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../_services/auth.service';
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
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.user = this.route.snapshot.data.user;
    this.userShort = this.user.name.split(' ').map(w => w[0]).join('').substring(0, 2);
  }

  public logout(): void {
    this.authService.logout();
  }

}
