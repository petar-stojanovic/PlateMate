import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  goalForms: FormGroup[] = [];
  goalForm!: FormGroup;
  userDetailsForm!: FormGroup;
  activityLevelForm!: FormGroup;
  dietaryForm!: FormGroup;
  flavorsForm!: FormGroup;
  mealsPerDayForm!: FormGroup;
  allergiesForm!: FormGroup;
  avoidFoodsForm!: FormGroup;
  additionalConsiderationsForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) {

    this.initGoalForm();
    this.initGenderForm();
    this.initActivityLevelForm();
    this.initDietaryPreferencesForm();
    this.initFlavorsForm();
    this.initMealsPerDayForm();
    this.initAllergiesForm();
    this.initAvoidFoodsForm();
    this.initAdditionalConsiderationsForm();


    this.goalForms.push(this.formBuilder.group({
      goal: ['', Validators.required],
    }))

    this.goalForms.push(this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    }));

    console.log(this.goalForms)
  }

  //TODO change following methods
  initGoalForm() {
    this.goalForm = this.formBuilder.group({
      primaryGoal: ['', Validators.required],
    });
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
      otherFlavor: ['']
    });
  }

  initMealsPerDayForm() {
    this.mealsPerDayForm = this.formBuilder.group({
      mealsPerDay: ['', Validators.required]
    });
  }

  initAllergiesForm() {
    this.allergiesForm = this.formBuilder.group({
      gluten: [false],
      dairy: [false],
      nuts: [false],
      shellfish: [false],
      soy: [false],
      otherAllergy: ['']
    });
  }

  initAvoidFoodsForm() {
    this.avoidFoodsForm = this.formBuilder.group({
      seafood: [false],
      redMeat: [false],
      pork: [false],
      eggs: [false],
      specificVegetablesFruits: [''],
      otherAvoidance: ['']
    });
  }

  initAdditionalConsiderationsForm() {
    this.additionalConsiderationsForm = this.formBuilder.group({
      dailyCost: ['', Validators.required],
      culinarySkills: ['', Validators.required],
      additionalInformation: ['']
    });
  }

}
