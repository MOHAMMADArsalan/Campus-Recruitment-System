import { FormControl } from "@angular/forms";

interface Validator<T extends FormControl> {
    (c: T): { [error: string]: any }
}

export function ValidateEmail(c: FormControl) {
    let EmailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let a = EmailPattern.test(c.value) ? null : {
        InValidPattern: true
    }
    return a;
}