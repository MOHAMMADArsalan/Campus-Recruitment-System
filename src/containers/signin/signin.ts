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
  @select(['auth', 'user']) user$: Observable<any>;

  constructor(private router: Router, private fb: FormBuilder, private aa: AuthActions) {
    // this.loader = true;
    this.user$.subscribe((auth) => {
      if (Object.keys(auth).length > 0) {
        this.router.navigate(['/home'])
      }
    })
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, ValidateEmail])],
      password: [null, Validators.compose([Validators.required])]
    })
  }

  ngOnInit() { }
  onSubmit(loginForm: any) {
    if (loginForm.valid) {
      this.aa.login(loginForm.value)
      console.log("signin.html", loginForm)
    }
  }

}
