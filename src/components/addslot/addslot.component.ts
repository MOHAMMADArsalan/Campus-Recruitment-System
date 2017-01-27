import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ParkingAction } from "./../../store"
@Component({
    selector: "add-slot",
    template: require("./addslot.component.html"),
    styles: [require("./addslot.component.scss")]
})

export class AddSlotComponent {
    bookSlotForm: FormGroup;
    slots: any[] = [1, 2, 3, 4, 5, 6, 7, 8];
    hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    selectHours = [1, 2, 3, 4, 5, 6];
    locationId: string;
    slotNo: string;
    model: Object = {}
    @Input() currentUser: any;
    @Input() pushKey: string;
    @Input() temp: any;
    @Output() saveMultipathEvent: EventEmitter<any>;
    @Output() getPushKey: EventEmitter<any>;

    constructor(private fb: FormBuilder, private ac: ActivatedRoute, private pe: ParkingAction) {
        this.ac.queryParams.subscribe((query: any) => {
            this.locationId = query.location;
            this.slotNo = query.slot;
            let slot = this.slotNo.split("slot")[1];
            this.pe.getOneParkingData(this.locationId, slot)
        })
        this.saveMultipathEvent = new EventEmitter();
        this.getPushKey = new EventEmitter();

        var date = new Date().toISOString().substring(0, 10);
        this.bookSlotForm = this.fb.group({
            date: [date, Validators.required],
            startHours: [this.hours[0], Validators.required],
            selectHours: [this.selectHours[0], Validators.required]
        })
    }
    ngOnChanges(changes) {
        console.log("changesssssssssssssssssssssssss", changes)
        // if(changes.temp && changes.temp.currentValue) {
        //     this.model['startHours'] = changes.temp.currentValue['startHours']
        //     this.model['selectHours'] = changes.temp.currentValue['selectHours']

        // }
    }
    ngOnInit() {
        this.getPushKey.emit()
    }
    submitForm(form: any) {
        let multipath = {};
        console.log("333333333333333333333333", form)
        let date = form.date.split("-")
        let slot = this.slotNo.split("slot")[1];
        let EndTime: any = new Date(+date[0], date[1] - 1, +date[2], (new Date().getHours() + (+form.selectHours)), new Date().getMinutes(), new Date().getSeconds());
        EndTime = new Date(EndTime).getTime();

        let StartTime: any = new Date(+date[0], date[1] - 1, +date[2], (new Date().getHours() + (+form.startHours)), new Date().getMinutes(), new Date().getSeconds());
        StartTime = new Date(StartTime).getTime();
        // this

        multipath[`parking-location/${this.locationId}/${slot}/status`] = 1;
        multipath[`parking-location/${this.locationId}/${slot}/booked-by`] = this.currentUser.auth.uid;
        multipath[`parking-location/${this.locationId}/${slot}/start-time`] = StartTime;
        multipath[`parking-location/${this.locationId}/${slot}/end-time`] = EndTime;
        multipath[`parking-location/${this.locationId}/${slot}/key`] = this.pushKey;
        multipath[`parking-location/${this.locationId}/${slot}/startHours`] = form.startHours;
        multipath[`parking-location/${this.locationId}/${slot}/selectHours`] = form.selectHours;

        multipath[`user-parking/${this.currentUser.auth.uid}/${this.pushKey}/status`] = 1;
        multipath[`user-parking/${this.currentUser.auth.uid}/${this.pushKey}/slot`] = "Slot" + " " + slot;
        multipath[`user-parking/${this.currentUser.auth.uid}/${this.pushKey}/location`] = this.locationId;
        multipath[`user-parking/${this.currentUser.auth.uid}/${this.pushKey}/booked-by`] = this.currentUser.auth.uid;
        multipath[`user-parking/${this.currentUser.auth.uid}/${this.pushKey}/start-time`] = StartTime;
        multipath[`user-parking/${this.currentUser.auth.uid}/${this.pushKey}/end-time`] = EndTime;

        this.saveMultipathEvent.emit(multipath)
        // currentTime.setHours(currentTime.getHours() + form.selectHours);
    }
}