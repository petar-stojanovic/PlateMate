import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  fieldRequired = 'This field is required';
  errorMessage: string | null = null;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();

  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),

      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(emailregex),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.checkPassword,
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.mustMatch('password'),
      ]),
    });
  }

  mustMatch(controlName: string) {
    return (control: AbstractControl) => {
      const passwordControl = control.parent?.get(controlName);

      if (passwordControl && control.value !== passwordControl.value) {
        return {mustMatch: true};
      }

      return null;
    };
  }

  getEmailErrors() {
    return this.registerForm.get('email').hasError('required')
      ? this.fieldRequired
      : this.registerForm.get('email').hasError('pattern')
        ? 'Not a valid Email Address'
        : '';
  }

  checkPassword(control: { value: any }) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? {requirements: true}
      : null;
  }

  getPasswordErrors() {
    return this.registerForm.get('password').hasError('required')
      ? 'This field is required!'
      : this.registerForm.get('password').hasError('requirements')
        ? 'Password needs to be at least six characters, one uppercase letter and one number'
        : '';
  }

  getConfirmPasswordErrors() {
    if (this.registerForm.get('confirmPassword').hasError('required')) {
      return this.fieldRequired;
    } else if (this.registerForm.get('confirmPassword').hasError('mustMatch')) {
      return 'The passwords must match';
    } else {
      return '';
    }
  }

  checkValidation(input: string) {
    const validation =
      this.registerForm.get(input).invalid &&
      (this.registerForm.get(input).dirty ||
        this.registerForm.get(input).touched);
    return validation;
  }

  onSubmit(formData: FormGroup) {
    const {
      firstName,
      lastName,
      username,
      email,
      password
    } = formData.value;

    console.log(firstName,
      lastName,
      username,
      email,
      password)

    this._authService
      .register(
        firstName,
        lastName,
        username,
        email,
        password
      ).then((response) => {
      console.log(response);
      this.router.navigate(['']);
    });
  }
}
