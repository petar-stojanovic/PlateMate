import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  goalForm!: FormGroup;
  userDetailsForm!: FormGroup;
  activityLevelForm!: FormGroup;
  dietaryForm!: FormGroup;
  flavorsForm!: FormGroup;
  mealsPerDayForm!: FormGroup;
  allergiesForm!: FormGroup;
  dailyMealCostForm!: FormGroup;
  additionalConsiderationsForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) {

    this.initGoalForm();
    this.initGenderForm();
    this.initActivityLevelForm();
    this.initDietaryPreferencesForm();
    this.initFlavorsForm();
    this.initMealsPerDayForm();
    this.initAllergiesForm();
    this.initDailyMealCostForm();
    this.initAdditionalConsiderationsForm();

  }


  initGoalForm() {
    this.goalForm = this.formBuilder.group({
      primaryGoal: ['', Validators.required],
      other: [''],
    }, {validator: this.customValidator});
  }

  customValidator(group: FormGroup) {
    if (group.get('primaryGoal')?.value === 'Other') {
      return group.get('other')?.value ? null : {'required': true};
    }
    return null;
  }


  initGenderForm() {
    this.userDetailsForm = this.formBuilder.group({
      gender: ['male', Validators.required],
      weight: ['', Validators.required],
      weightMeasurement: ['kgs', Validators.required],
      height: ['', Validators.required],
      heightMeasurement: ['cm', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]]
    });
  }

  initActivityLevelForm() {
    this.activityLevelForm = this.formBuilder.group({
      activityLevel: ['', Validators.required]
    });
  }

  initDietaryPreferencesForm() {
    this.dietaryForm = this.formBuilder.group({
      dietaryRestrictions: this.formBuilder.group({
        omnivore: [false],
        vegetarian: [false],
        vegan: [false],
        glutenFree: [false],
        dairyFree: [false],
        nutFree: [false],
        other: ['']
      }),
      dietaryPreferences: this.formBuilder.group({
        mediterranean: [false],
        paleo: [false],
        keto: [false],
        whole30: [false],
        lowCarb: [false],
        highProtein: [false],
        other: ['']
      })
    });
  }

  initFlavorsForm() {
    this.flavorsForm = this.formBuilder.group({
      sweet: [false],
      spicy: [false],
      savory: [false],
      sour: [false],
      bitter: [false],
      other: ['']
    });
  }

  initMealsPerDayForm() {
    this.mealsPerDayForm = this.formBuilder.group({
      mealsPerDay: ['3', Validators.required]
    });
  }

  initAllergiesForm() {
    this.allergiesForm = this.formBuilder.group({
      milk: [false],
      eggs: [false],
      fish: [false],
      nuts: [false],
      wheat: [false],
      sesame: [false],
      other: ['']
    });
  }


  initDailyMealCostForm() {
    this.dailyMealCostForm = this.formBuilder.group({
      price: ['', Validators.required],
    });
  }

  initAdditionalConsiderationsForm() {
    this.additionalConsiderationsForm = this.formBuilder.group({
      text: ['']
    });
  }

}
