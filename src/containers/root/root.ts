import { Component, Input, ViewEncapsulation } from '@angular/core';
declare let google: any;

declare let firebase: any;
@Component({
  selector: 'root',
  template: require('./root.html'),
  styles: [require('./root.scss')/*, require("./../assets/scss/variables.scss")*/],
  encapsulation: ViewEncapsulation.None
})
export class RootContainer{
  constructor() { }

}
