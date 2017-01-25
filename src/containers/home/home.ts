import { Component, Input, OnInit } from '@angular/core';
import { Observable, select } from '../../store';
// import 'rxjs/add/operator/distinctUntilChnaged';

@Component({
  selector: 'home',
  template: require('./home.html'),
  styles: [require("./home.scss")]
})
export class HomeContainer {

  constructor() {
  }

  ngOnInit() { }
}
