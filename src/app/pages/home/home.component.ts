import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  goalForms: FormGroup[] = [];

  constructor(private _formBuilder: FormBuilder) {

    this.goalForms.push(this._formBuilder.group({
      goal: ['', Validators.required],
    }))

    this.goalForms.push(this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    }));

    console.log(this.goalForms)
  }
}
