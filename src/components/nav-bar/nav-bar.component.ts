import { Component, Input } from "@angular/core";
import { AuthActions } from "./../../store"
@Component({
    selector: "nav-bar",
    template: require("./nav-bar.component.html"),
    styles: [
        require("./nav-bar.component.scss"),
        require("./../nav-login/nav-login.component.scss"),
        require("./../../config/root.scss")]
})

export class NavBarComponent {
    @Input() currentUser: any;
    constructor(private aa: AuthActions) { }
    Logout() {
        this.aa.logout()
    }
}