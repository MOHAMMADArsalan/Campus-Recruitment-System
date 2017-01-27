"use strict";
function ValidateEmail(c) {
    var EmailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var a = EmailPattern.test(c.value) ? null : {
        InValidPattern: true
    };
    return a;
}
exports.ValidateEmail = ValidateEmail;
