import { Component } from "@angular/core";

@Component({
    selector: "nav-bar",
    template: require("./nav-bar.component.html"),
    styles: [require("./../nav-login/nav-login.component.scss"), require("./../../config/root.scss")]
})

export class NavBarComponent {
    constructor() { }
}