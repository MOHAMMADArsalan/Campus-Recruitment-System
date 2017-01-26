import { Component, Input, ElementRef, Output, EventEmitter, OnChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseService } from "./../../providers";
declare var require: any;

@Component({
    selector: 'modal',
    template: require("./modal.component.html"),
    styles: [require("./modal.scss"), require("./../../containers/signup/signup.scss")]
})

export class ModalComponent implements OnChanges {
    @Input() IsPrivate: boolean;
    @Input() pushKey: string;
    @Input() currentUser: any;
    @Output() saveMultipath: EventEmitter<any>;
    postForm: FormGroup;
    constructor(myElement: ElementRef, private _fb: FormBuilder, private fb: FirebaseService) {
        this.saveMultipath = new EventEmitter();
        this.postForm = _fb.group({
            title: ["", Validators.required],
            desc: ['', Validators.required],
            salary: ['', Validators.required]
        })

    }
    ngOnChanges(value: any) {
        console.log(this.currentUser)
    }
    // saveToFirebase(Obj: any, file: Object, form: any, isPrivate: boolean) {
    //     let multipath = {};

    // }
    onSubmit(form: any) {
        if (form.valid) {
            let multipath = {};
            let Obj = form.value;
            Obj['applied-count'] = 0;
            Obj['timestamp'] = this.fb.firebaseTimeStamp;
            Obj['name'] = this.currentUser.name;
            Obj['address'] = this.currentUser.address;
            Obj['email'] = this.currentUser.email;
            Obj['applied'] = "";
            multipath[`company-posts/${this.currentUser.auth.uid}/${this.pushKey}`] = Obj;
            let newObj = Object.assign({}, Obj);
            newObj['created-by'] = this.currentUser.auth.uid;
            multipath[`posts/${this.pushKey}`] = newObj;

            this.saveMultipath.emit(multipath);
        }
    }

}

