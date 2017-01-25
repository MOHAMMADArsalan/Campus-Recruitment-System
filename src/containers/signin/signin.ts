import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidateEmail } from "./../../customValidators/customEmailValidation";
import { select, Observable, AuthActions } from "./../../store";
@Component({
  selector: 'signin',
  template: require('./signin.html'),
  styles: [require("./signin.scss"), require("./../signup/signup.scss")]
})
export class SigninContainer implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private aa: AuthActions) {
    // this.loader = true;
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, ValidateEmail])],
      password: [null, Validators.compose([Validators.required])]
    })
  }

  ngOnInit() { }
  onSubmit(loginForm: any) {
    if (loginForm.valid) {
      console.log("signin.html", loginForm)
    }
  }

}
