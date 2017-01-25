import { Component, Input, OnInit } from '@angular/core';
import { Observable, select, CounterActions } from '../../store';
// import 'rxjs/add/operator/distinctUntilChnaged';

@Component({
  selector: 'home',
  template: require('./home.html'),
  styles: [require("./home.scss")]
})
export class HomeContainer {
  @select(['counter', 'counter']) count$: Observable<any>;

  constructor(private ca: CounterActions) {
    this.count$.subscribe(x => {
      console.log('on counter fire....', x);
    })
  }

  ngOnInit() { }

  add() {
    this.ca.increment();
  }
  sub() {
    this.ca.decrement();
  }

}
