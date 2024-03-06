import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatToolbar,
    MatCard,
    MatFormField,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButton
  ]
})
export class AuthModule {
}
