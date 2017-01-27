import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
    selector: 'view-feedback',
    template: require("./viewfeedback.html"),
    styles: [require("./viewfeedback.scss")]
})

export class ViewFeedBackComponent {
    @Input() feedbackList: any[]
    @Output() deleteFeedback: EventEmitter<any>;
    constructor() {
        this.deleteFeedback = new EventEmitter();
    }
    delete(feedbackKey: string) {
        let multipath = {}
        multipath[`feedback/${feedbackKey}`] = null;
        this.deleteFeedback.emit(multipath);
    }
}