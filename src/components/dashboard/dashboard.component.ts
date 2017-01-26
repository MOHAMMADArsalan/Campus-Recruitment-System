import { Component, Input, Output, EventEmitter } from "@angular/core";
declare var $: any;

@Component({
    selector: "dashboard-component",
    template: require("./dashboard.component.html"),
    styles: [require("./dashboard.component.scss"), require("./../../config/root.scss")]

})

export class DashboardComponent {
    @Input() companies: any;
    @Input() isLoading: boolean;
    @Input() students: any;
    @Input() posts: any;
    @Input() currentUser: any;
    @Input() postPushKey: string;
    @Input() isPosted: string;
    tab: string = 'company';
    isShow: boolean = false;
    @Output() deleteData: EventEmitter<any>;
    @Output() getPostPushKey: EventEmitter<any>;
    @Output() saveMultipath: EventEmitter<any>;
    constructor() {
        this.deleteData = new EventEmitter();
        this.getPostPushKey = new EventEmitter();
        this.saveMultipath = new EventEmitter();
    }
    ngOnChanges(Changes: any) {
        if (Changes.isPosted && Changes.isPosted.currentValue) {
            $("#myModal").modal('hide');
            this.isShow = false;
        }
    }
    checkLength(object) {
        return Object.keys(object).length === 0 ? true : false;
    }
    showData(tab: string) {
        this.tab = tab;
    }
    delete(event) {
        this.deleteData.emit(event);
    }
    Changes() {
        this.getPostPushKey.emit(this.currentUser.auth.uid)
    }
    saveMultipathHandler(event: Object) {
        this.saveMultipath.emit(event)
    }
}