import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {

  public title: string = '';
  public text: string = '';
  public show: boolean = false;
  private _promise: Subject<void>;

  constructor() {
    this._promise = new Subject<void>();
  }

  public open(title: string, text: string): Promise<void> {
    this.title = title;
    this.text = text;
    this.show = true;
    this._promise = new Subject<void>();

    return this._promise.toPromise();
  }

  yes(): void {
    this.show = false;
    this._promise?.complete();
  }

  no(): void {
    this.show = false;
    this._promise?.error(null);
  }

}
