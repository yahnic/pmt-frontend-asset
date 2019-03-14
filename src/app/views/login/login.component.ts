import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthService } from '../../_services';
import { LoginType, LoginPayload } from '../../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    invalidLogin = false;
    returnUrl: string;
    loginType: LoginType = LoginType.EMAIL;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.createForm();
    }

    ngOnInit() {
        console.log('Calling ngOnInit()');
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.onLoggin();
    }

    createForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.minLength(11)]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    onLoggin() {
        const token = window.localStorage.getItem('token');
        if (typeof token === 'string') {
            this.router.navigate(['/dashboard'])
            // this.router.navigate([this.returnUrl])
            .then(nav => { console.log(nav); },
                err => { console.log(err); });
            console.log('\n\nNav to dashboard or ', this.returnUrl);
            return;
        } else {
            console.log('Token not found!');
            return;
        }
    }

    onErrorLoggin(error) {
        this.alertService.error(error);
        this.invalidLogin = true;
        this.loading = false;
        return;
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;

        const loginPayload: LoginPayload = {
            email: this.f.email.value,
            phone: this.f.phone.value,
            password: this.f.password.value,
            type: this.loginType,
        };

        // console.log('LoginComponent', loginPayload);

        return this.authService.login(loginPayload)
            .pipe(first())
            .subscribe(
                data => this.onLoggin(),
                error => this.onErrorLoggin(error));
    }
}


///
/*
    onSubmit() {
        if (this.loginForm.invalid) {
            console.log('this.loginForm.invalid');
          return;
        }
        const loginPayload = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        };
        this.loginService.login(loginPayload).subscribe(data => {
            this.response = data;
            console.log(this.response);
          if (this.response.success) {
              const { token, user } = this.response.payload;
              window.localStorage.setItem('token', token);
              window.localStorage.setItem('user', JSON.stringify(user));
          } else {
            this.invalidLogin = true;
            alert(data.message);
          }
          this.onLoggin();
        });
      }
*/
