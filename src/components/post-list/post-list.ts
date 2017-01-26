import { Component, Input } from "@angular/core";

@Component({
    selector: "post-list",
    template: require("./post-list.html")
})

export class PostListComponent {
    @Input() post: any;
    constructor() { }
    keys(obj: Object) {
        return obj ? Object.keys(obj) : [];
    }
}