import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {AiService} from "../../services/ai.service";
import {AiResponse} from "../../shared/interfaces/ai-response";

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

  aiResponse: AiResponse | null = null;
  // aiResponse: AiResponse | null = {
  //   "meals": [
  //     {
  //       "meal_time": "Breakfast",
  //       "recipe_name": "Scrambled Eggs with Spinach and Whole Wheat Toast",
  //       "description": "A hearty and nutritious breakfast, combining the richness of eggs with the freshness of spinach, served with whole wheat toast for a balanced start.",
  //       "ingredients": [
  //         {
  //           "ingredient": "Eggs",
  //           "amount": "2 large"
  //         },
  //         {
  //           "ingredient": "Spinach",
  //           "amount": "1 cup"
  //         },
  //         {
  //           "ingredient": "Whole wheat bread",
  //           "amount": "2 slices"
  //         },
  //         {
  //           "ingredient": "Olive oil",
  //           "amount": "1 tsp"
  //         },
  //         {
  //           "ingredient": "Salt",
  //           "amount": "to taste"
  //         },
  //         {
  //           "ingredient": "Pepper",
  //           "amount": "to taste"
  //         }
  //       ],
  //       "categories": [
  //         "Breakfast",
  //         "High Protein",
  //         "Low Calorie"
  //       ],
  //       "nutritional_info": {
  //         "calories": 350,
  //         "protein": "20g",
  //         "carbohydrates": "35g",
  //         "fats": "15g",
  //         "sugar": "4g",
  //         "fiber": "6g"
  //       },
  //       "preparation_instructions": [
  //         "Heat the olive oil in a non-stick pan over medium heat.",
  //         "Add spinach and stir until wilted, set aside.",
  //         "In a bowl, beat the eggs and season with salt and pepper.",
  //         "Pour the eggs into the pan, add the spinach, and scramble until fully cooked.",
  //         "Toast the whole wheat bread slices.",
  //         "Serve the scrambled eggs hot with the toast on the side."
  //       ],
  //       "estimated_cost": "$6",
  //       "time_to_prepare": "15 minutes",
  //       "servings": 1
  //     },
  //     {
  //       "meal_time": "Lunch",
  //       "recipe_name": "Grilled Chicken Salad",
  //       "description": "A refreshing and protein-rich salad, featuring grilled chicken over a bed of mixed greens, cherry tomatoes, cucumbers, and a light vinaigrette.",
  //       "ingredients": [
  //         {
  //           "ingredient": "Chicken breast",
  //           "amount": "1 (200g)"
  //         },
  //         {
  //           "ingredient": "Mixed greens",
  //           "amount": "2 cups"
  //         },
  //         {
  //           "ingredient": "Cherry tomatoes",
  //           "amount": "1/2 cup"
  //         },
  //         {
  //           "ingredient": "Cucumber",
  //           "amount": "1/2 cup sliced"
  //         },
  //         {
  //           "ingredient": "Olive oil",
  //           "amount": "1 tbsp"
  //         },
  //         {
  //           "ingredient": "Balsamic vinegar",
  //           "amount": "1 tbsp"
  //         },
  //         {
  //           "ingredient": "Salt",
  //           "amount": "to taste"
  //         },
  //         {
  //           "ingredient": "Pepper",
  //           "amount": "to taste"
  //         }
  //       ],
  //       "categories": [
  //         "Lunch",
  //         "High Protein",
  //         "Low Carb"
  //       ],
  //       "nutritional_info": {
  //         "calories": 400,
  //         "protein": "35g",
  //         "carbohydrates": "10g",
  //         "fats": "22g",
  //         "sugar": "6g",
  //         "fiber": "3g"
  //       },
  //       "preparation_instructions": [
  //         "Preheat the grill to medium-high heat.",
  //         "Season the chicken breast with salt and pepper.",
  //         "Grill the chicken for 6-7 minutes per side or until fully cooked. Let it rest before slicing.",
  //         "In a large bowl, combine mixed greens, cherry tomatoes, and cucumber.",
  //         "Whisk together olive oil and balsamic vinegar, drizzle over the salad, and toss.",
  //         "Top the salad with sliced grilled chicken."
  //       ],
  //       "estimated_cost": "$10",
  //       "time_to_prepare": "30 minutes",
  //       "servings": 1
  //     },
  //     {
  //       "meal_time": "Snack",
  //       "recipe_name": "Greek Yogurt with Honey and Nuts",
  //       "description": "A smooth, creamy Greek yogurt topped with a drizzle of honey and a sprinkle of mixed nuts for a sweet and satisfying snack.",
  //       "ingredients": [
  //         {
  //           "ingredient": "Greek yogurt",
  //           "amount": "1 cup"
  //         },
  //         {
  //           "ingredient": "Honey",
  //           "amount": "1 tbsp"
  //         },
  //         {
  //           "ingredient": "Mixed nuts",
  //           "amount": "1/4 cup"
  //         }
  //       ],
  //       "categories": [
  //         "Snack",
  //         "High Protein"
  //       ],
  //       "nutritional_info": {
  //         "calories": 200,
  //         "protein": "11g",
  //         "carbohydrates": "18g",
  //         "fats": "10g",
  //         "sugar": "17g",
  //         "fiber": "2g"
  //       },
  //       "preparation_instructions": [
  //         "Scoop the Greek yogurt into a bowl.",
  //         "Drizzle the honey over the yogurt.",
  //         "Sprinkle the mixed nuts on top.",
  //         "Serve immediately or chill for a cooler treat."
  //       ],
  //       "estimated_cost": "$4",
  //       "time_to_prepare": "5 minutes",
  //       "servings": 1
  //     },
  //     {
  //       "meal_time": "Dinner",
  //       "recipe_name": "Pork Chops with Mashed Potatoes and Green Beans",
  //       "description": "Juicy grilled pork chops served with creamy mashed potatoes and steamed green beans for a classic and hearty dinner.",
  //       "ingredients": [
  //         {
  //           "ingredient": "Pork chops",
  //           "amount": "2 (6oz each)"
  //         },
  //         {
  //           "ingredient": "Potatoes",
  //           "amount": "3 medium"
  //         },
  //         {
  //           "ingredient": "Green beans",
  //           "amount": "1 cup"
  //         },
  //         {
  //           "ingredient": "Butter",
  //           "amount": "2 tbsp"
  //         },
  //         {
  //           "ingredient": "Milk",
  //           "amount": "1/4 cup"
  //         },
  //         {
  //           "ingredient": "Salt",
  //           "amount": "to taste"
  //         },
  //         {
  //           "ingredient": "Pepper",
  //           "amount": "to taste"
  //         },
  //         {
  //           "ingredient": "Olive oil",
  //           "amount": "1 tsp"
  //         }
  //       ],
  //       "categories": [
  //         "Dinner",
  //         "High Protein",
  //         "Comfort Food"
  //       ],
  //       "nutritional_info": {
  //         "calories": 600,
  //         "protein": "45g",
  //         "carbohydrates": "45g",
  //         "fats": "28g",
  //         "sugar": "5g",
  //         "fiber": "6g"
  //       },
  //       "preparation_instructions": [
  //         "Preheat your grill or skillet over medium-high heat and brush with olive oil.",
  //         "Season the pork chops with salt and pepper, grill each side for 4-5 minutes or until fully cooked. Let them rest.",
  //         "Boil the potatoes until tender, mash them with butter, milk, salt, and pepper until smooth.",
  //         "Steam the green beans until tender-crisp.",
  //         "Serve the grilled pork chops with mashed potatoes and green beans on the side."
  //       ],
  //       "estimated_cost": "$15",
  //       "time_to_prepare": "45 minutes",
  //       "servings": 1
  //     }
  //   ]
  // }

  isLoading = false;
  isSubmitted = false;

  goalForm!: FormGroup;
  userDetailsForm!: FormGroup;
  activityLevelForm!: FormGroup;
  dietaryForm!: FormGroup;
  flavorsForm!: FormGroup;
  mealsPerDayForm!: FormGroup;
  allergiesForm!: FormGroup;
  dailyMealCostForm!: FormGroup;
  additionalConsiderationsForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private aiService: AiService) {

    console.log(this.aiResponse);

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
      additionalInformation: ['']
    });
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
      this.flavorsForm.get('flavorsList')?.setValue(this.flavors.map(f => f.name));
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
      this.allergiesForm.get('allergyList')?.setValue(this.allergies.map(f => f.name));
    }
  }

  async submitForm() {
    this.isSubmitted = true;

    let primaryGoalData = {
      primaryGoal: this.goalForm.get('primaryGoal')?.value
    };

    if (this.goalForm.get('primaryGoal')?.value === 'other') {
      primaryGoalData = {
        primaryGoal: this.goalForm.get('other')?.value
      }
    }

    let dietData = {
      diet: this.dietaryForm.get('diet')?.value
    };

    if (this.dietaryForm.get('diet')?.value === 'other') {
      dietData = {
        diet: this.dietaryForm.get('other')?.value
      }
    }

    const data = [];
    data.push(primaryGoalData);
    data.push(this.userDetailsForm.value);
    data.push(this.activityLevelForm.value);
    data.push(dietData);
    data.push(this.flavorsForm.value);
    data.push(this.mealsPerDayForm.value);
    data.push(this.allergiesForm.value);
    data.push(this.dailyMealCostForm.value);
    data.push(this.additionalConsiderationsForm.value);

    console.log(data);

    this.isLoading = true;

    const stream = await this.aiService.generate(data).then((res) => {
      const aiResponse = res.choices[0].message.content || '';
      this.aiResponse = JSON.parse(aiResponse) as AiResponse;
      console.log(this.aiResponse);
      this.isLoading = false;
    });


    // for await (const chunk of stream) {
    //   const aiResponse = chunk.choices[0].delta.content || '';
    //   console.log(aiResponse)
    //   if (aiResponse !== undefined || aiResponse !== "undefined") {
    //     this.aiResponse += aiResponse;
    //   }
    //   console.log(this.aiResponse)
    // }
    // this.isLoading = true;


  }
}
