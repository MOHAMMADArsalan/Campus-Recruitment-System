import { Component, Input } from "@angular/core";
import {} from ""
@Component({
    selector: "nav-bar",
    template: require("./nav-bar.component.html"),
    styles: [require("./../nav-login/nav-login.component.scss"), require("./../../config/root.scss")]
})

export class NavBarComponent {
    @Input() currentUser: any;
    constructor() { }
    Logout() { }
}