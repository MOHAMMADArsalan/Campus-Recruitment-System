import { Component, Input } from "@angular/core";

@Component({
    selector: "[table-header]",
    template: require("./table-header.component.html")
})

export class TableHeaderComponent {
    @Input() isCompany: boolean;
    constructor() {

    }
}
