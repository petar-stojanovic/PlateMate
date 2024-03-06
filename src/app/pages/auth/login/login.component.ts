import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: any;
  fieldRequired = 'This field is required';
  invalidCredentials = false;
  errorMessage: string | null = null;

  constructor(
    private _authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  checkValidation(input: string) {
    const validation =
      this.loginForm.get(input).invalid &&
      (this.loginForm.get(input).dirty || this.loginForm.get(input).touched);
    return validation;
  }

  onSubmit(formData: FormGroup) {
    const {
      email,
      password
    } = formData.value;

    this._authService.login(email, password).then(() => {
        this.router.navigate(['']);
      }
    );
  }
}
