import {Component, Input} from '@angular/core';
import {Meal} from "../../../shared/interfaces/ai-response";

@Component({
  selector: 'app-meal-info',
  templateUrl: './meal-info.component.html',
  styleUrl: './meal-info.component.scss'
})
export class MealInfoComponent {
  @Input({
    required: true
  }) meal!: Meal;

}
