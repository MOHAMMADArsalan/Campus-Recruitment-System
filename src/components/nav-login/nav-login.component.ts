import { Component } from "@angular/core";

@Component({
    selector: "nav-login",
    template: require("./nav-login.component.html"),
    styles: [require("./nav-login.component.scss"), require("./../../config/root.scss")]
})

export class NavLoginComponent {
    constructor() { }
}