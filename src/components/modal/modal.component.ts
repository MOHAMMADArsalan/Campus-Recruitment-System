import { Component, Input, ElementRef, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseService } from "./../../providers";
declare var require: any;

@Component({
    selector: 'modal',
    template: require("./modal.component.html"),
    styles: [require("./modal.scss"), require("./../../containers/signup/signup.scss")]
})

export class ModalComponent {
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
    onSubmit(form: any) {
        if (form.value) {
            let multipath = {};
            let Obj = {};
            Obj['feedback'] = form.value;
            Obj['timestamp'] = this.fb.firebaseTimeStamp;
            Obj['name'] = this.currentUser.firstname + " " + this.currentUser.lastname;
            Obj['feedback-by'] = this.currentUser.auth.uid;
            Obj['email'] = this.currentUser.email;
            multipath[`feedback/${this.pushKey}`] = Obj;
            // multipath[`company-posts/${this.currentUser.auth.uid}/${this.pushKey}`] = Obj;
            // let newObj = Object.assign({}, Obj);
            // newObj['created-by'] = this.currentUser.auth.uid;
            // multipath[`posts/${this.pushKey}`] = newObj;
            this.saveMultipath.emit(multipath);
        }
    }

}

