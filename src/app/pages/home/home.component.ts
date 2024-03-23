import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  flavors = [{name: 'Sweet'}, {name: 'Spicy'}, {name: 'Crunchy'}];
  allergies = [{name: 'Milk'}, {name: 'Oats'}];


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
    }, {validator: this.customGoalFormValidator});
  }

  customGoalFormValidator(group: FormGroup) {
    if (group.get('primaryGoal')?.value === 'other') {
      return group.get('other')?.value ? null : {'required': true};
    }
    return null;
  }


  initGenderForm() {
    this.userDetailsForm = this.formBuilder.group({
      gender: ['male', Validators.required],
      weight: ['100', Validators.required],
      weightMeasurement: ['kgs', Validators.required],
      height: ['175', Validators.required],
      heightMeasurement: ['cm', Validators.required],
      age: ['22', [Validators.required, Validators.min(1)]]
    });
  }

  initActivityLevelForm() {
    this.activityLevelForm = this.formBuilder.group({
      activityLevel: ['', Validators.required]
    });
  }

  initDietaryPreferencesForm() {
    this.dietaryForm = this.formBuilder.group({
      diet: ['Omnivore', [Validators.required]],
      other: [''],
      // dietaryRestrictions: this.formBuilder.group({
      //   diet: ['', [Validators.required]],
      //   other: ['']
      // }),
      // dietaryPreferences: this.formBuilder.group({
      //   mediterranean: [false],
      //   paleo: [false],
      //   keto: [false],
      //   whole30: [false],
      //   lowCarb: [false],
      //   highProtein: [false],
      //   other: ['']
      // })
    }, {validator: this.customDietaryPreferenceGoalValidator});
  }

  customDietaryPreferenceGoalValidator(group: FormGroup) {
    if (group.get('diet')?.value === 'other') {
      return group.get('other')?.value ? null : {'required': true};
    }
    return null;
  }

  initFlavorsForm() {
    this.flavorsForm = this.formBuilder.group({
      flavorsList: [''],
    });
    this.flavorsForm.get('flavorsList')?.setValue(this.flavors.map(f => f.name));

  }

  initMealsPerDayForm() {
    this.mealsPerDayForm = this.formBuilder.group({
      mealsPerDay: ['3', Validators.required]
    });
  }

  initAllergiesForm() {
    this.allergiesForm = this.formBuilder.group({
      allergyList: ['']
    });
    this.allergiesForm.get('allergyList')?.setValue(this.allergies.map(f => f.name));
  }


  initDailyMealCostForm() {
    this.dailyMealCostForm = this.formBuilder.group({
      price: ['Less than $10', Validators.required],
    });
  }

  initAdditionalConsiderationsForm() {
    this.additionalConsiderationsForm = this.formBuilder.group({
      text: ['']
    });
  }

  submitForm() {
    console.log(this.goalForm.value);
    console.log(this.userDetailsForm.value);
    console.log(this.activityLevelForm.value);
    console.log(this.dietaryForm.value);
    console.log(this.flavorsForm.value);
    console.log(this.mealsPerDayForm.value);
    console.log(this.allergiesForm.value);
    console.log(this.dailyMealCostForm.value);
    console.log(this.additionalConsiderationsForm.value);

    const data = {
      ...this.goalForm.value,
      ...this.userDetailsForm.value,
      ...this.activityLevelForm.value,
      ...this.dietaryForm.value,
      ...this.flavorsForm.value,
      ...this.mealsPerDayForm.value,
      ...this.allergiesForm.value,
      ...this.dailyMealCostForm.value,
      ...this.additionalConsiderationsForm.value
    };

    console.log(data);
  }

  addFlavor(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.flavors.push({name: value});
      this.flavorsForm.get('flavorsList')?.setValue(this.flavors.map(f => f.name));
    }
    event.chipInput!.clear();
  }

  removeFlavor(flavor: any): void {
    const index = this.flavors.indexOf(flavor);

    if (index >= 0) {
      this.flavors.splice(index, 1);
    }
  }

  addAllergy(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.allergies.push({name: value});
      this.allergiesForm.get('allergyList')?.setValue(this.allergies.map(f => f.name));
    }
    event.chipInput!.clear();
  }

  removeAllergy(allergy: any): void {
    const index = this.allergies.indexOf(allergy);

    if (index >= 0) {
      this.allergies.splice(index, 1);
    }
  }
}
