import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective {

  @HostBinding('class.active')
  private isOpened: boolean = false;

  private isRecentlyOpened: boolean = false;

  @HostListener('click', ['$event'])
  click($event: any): void {
    if(this.isOpened) {
      this.isOpened = false;
    }
    else {
      this.isOpened = true;
      this.isRecentlyOpened = true;
    }
  }

  @HostListener('document:click')
  outsideClick(): void {
    if(this.isRecentlyOpened) {
      this.isRecentlyOpened = false;
    }
    else {
      this.isOpened = false;
    }
  }

}
