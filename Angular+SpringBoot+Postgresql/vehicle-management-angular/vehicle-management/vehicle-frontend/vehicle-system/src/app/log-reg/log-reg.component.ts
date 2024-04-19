import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  registrationForm!: FormGroup;
  loginFailed: boolean = false;
  loginUsername: any;
  loginPassword: any;
  hideLoginPassword: boolean = true;
  hideRegisterPassword: boolean = true;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

      this.http.post('http://localhost:8080/api/register', userData, { responseType: 'text', observe: 'response' })
        .subscribe(
          (response: HttpResponse<any>) => {
            console.log('Registration successful:');
            // alert('Registration successful');
            this.tabGroup.selectedIndex = 0;
          },
          (error: HttpErrorResponse) => {
            console.error('Registration failed:', error);
            if (error.status === 400) {
              alert('Email or username already exists');
            } else {
              alert('Registration failed');
            }
          }
        );
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  login() {
    const loginData = {
      username: this.loginUsername,
      password: this.loginPassword
    };

    this.http.post('http://localhost:8080/api/login', loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:');
          this.router.navigate(['/v-logsuccess']);
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          this.loginFailed = true;
        }
      });
  }
  togglePasswordVisibility(): void {
    this.hideLoginPassword = !this.hideLoginPassword;
  }
  toggleRegisterPasswordVisibility() {
    this.hideRegisterPassword = !this.hideRegisterPassword;
  }
}
