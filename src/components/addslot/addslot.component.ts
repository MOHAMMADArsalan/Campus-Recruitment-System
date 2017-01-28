import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ParkingAction } from "./../../store"
import { FirebaseService } from "./../../providers"
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
    hour: any = 0;
    selecthour: any = 1;
    model: Object = {}
    invalid: boolean = false;
    @Input() avail: any[]
    @Input() currentUser: any;
    @Input() pushKey: string;
    @Input() temp: any;
    @Output() saveMultipathEvent: EventEmitter<any>;
    @Output() getPushKey: EventEmitter<any>;
    date = new Date().toISOString().substring(0, 10);
    constructor(private fb: FormBuilder, private ac: ActivatedRoute, private pe: ParkingAction, private _fb: FirebaseService) {
        this.ac.queryParams.subscribe((query: any) => {
            this.locationId = query.location;
            this.slotNo = query.slot;
            let slot = this.slotNo.split("slot")[1];
            this.pe.getOneParkingData(this.locationId, slot);
            console.log("this.locationId, slot, new Date().toISOString().split('T')[1]", this.locationId, slot, new Date().toISOString().split('T')[0])
            this.pe.getParkingAvailablity(this.locationId, slot, new Date().toISOString().split('T')[0])
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
    checkAvail(hour, type) {
        event.preventDefault();
        if (type === 'hour' && (this.date == new Date().toISOString().split('T')[0])) {
            this.hour = parseInt(hour);
            if (this.avail[this.avail.indexOf(+hour)]) {
                this.invalid = true;
            } else {
                this.invalid = false;
            }
        } else if (type === 'selecthour' && (this.date == new Date().toISOString().split('T')[0])) {
            this.selecthour = parseInt(hour);
            let sh = parseInt(hour) + parseInt(this.hour);
            let flag = false;
            for (let i = this.hour + 1; i <= sh; i++) {
                if (this.avail[this.avail.indexOf(i)]) {
                    this.invalid = true;
                    break;
                } else {
                    this.invalid = false;
                }
            }
        } else if (type == 'date') {
            if (hour != new Date().toISOString().split('T')[0]) {
                this.invalid = false;
            } else {
                if (this.avail[this.avail.indexOf(+this.hour)]) {
                    this.invalid = true;
                } else {
                    this.invalid = false;
                }
                let sh = parseInt(this.selecthour) + parseInt(this.hour);
                for (let i = this.hour + 1; i <= sh; i++) {
                    if (this.avail[this.avail.indexOf(i)]) {
                        this.invalid = true;
                        break;
                    } else {
                        this.invalid = false;
                    }
                }
            }
        }
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
        if (this.invalid) {
            return false;
        }
        let key = this._fb.getPushRef("/parking-location").push().key;
        let multipath = {};
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
        multipath[`parking-location/${this.locationId}/${slot}/key`] = key;
        multipath[`parking-location/${this.locationId}/${slot}/date`] = form.date;
        multipath[`parking-location/${this.locationId}/${slot}/startHours`] = form.startHours;
        multipath[`parking-location/${this.locationId}/${slot}/selectHours`] = form.selectHours;
        let loopLength = +form.selectHours;
        for (let i = 0; i < loopLength; i++) {
            let loopLength = form.selectHours - form.startHours;
            multipath[`parking-availablity/${this.locationId}/${slot}/${form.date}/${key}/${i}`] = (+form.startHours) + i;
        }
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}/status`] = 1;
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}/date`] = form.date;
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}/slot`] = "Slot" + " " + slot;
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}/location`] = this.locationId;
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}/booked-by`] = this.currentUser.auth.uid;
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}/start-time`] = StartTime;
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}/end-time`] = EndTime;
        this.saveMultipathEvent.emit(multipath)
    }
}