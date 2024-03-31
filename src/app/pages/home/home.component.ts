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
  //       "recipe_name": "Greek Yogurt Parfait",
  //       "description": "A light and refreshing breakfast option with layers of Greek yogurt, fresh berries, and crunchy granola.",
  //       "ingredients": [
  //         {
  //           "ingredient": "Greek yogurt",
  //           "amount": "1 cup"
  //         },
  //         {
  //           "ingredient": "Mixed berries",
  //           "amount": "1/2 cup"
  //         },
  //         {
  //           "ingredient": "Granola",
  //           "amount": "1/4 cup"
  //         },
  //         {
  //           "ingredient": "Honey",
  //           "amount": "1 tbsp"
  //         }
  //       ],
  //       "categories": [
  //         "Healthy",
  //         "Quick & Easy",
  //         "Breakfast"
  //       ],
  //       "nutritional_info": {
  //         "calories": 250,
  //         "protein": "15g",
  //         "carbohydrates": "40g",
  //         "fats": "5g",
  //         "sugar": "20g",
  //         "fiber": "6g"
  //       },
  //       "preparation_instructions": [
  //         "In a glass or bowl, layer Greek yogurt, mixed berries, and granola.",
  //         "Drizzle honey on top for added sweetness.",
  //         "Enjoy this crunchy and satisfying parfait!"
  //       ],
  //       "estimated_cost": "$5 - $8",
  //       "time_to_prepare": "5 minutes",
  //       "servings": 1
  //     },
  //     {
  //       "meal_time": "Lunch",
  //       "recipe_name": "Grilled Chicken Salad",
  //       "description": "A hearty and protein-packed salad with grilled chicken, mixed greens, crunchy vegetables, and a zesty vinaigrette.",
  //       "ingredients": [
  //         {
  //           "ingredient": "Grilled chicken breast",
  //           "amount": "4 oz"
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
  //           "amount": "1/2"
  //         },
  //         {
  //           "ingredient": "Bell pepper",
  //           "amount": "1/2"
  //         },
  //         {
  //           "ingredient": "Vinaigrette dressing",
  //           "amount": "2 tbsp"
  //         }
  //       ],
  //       "categories": [
  //         "Protein-rich",
  //         "Salad",
  //         "Lunch"
  //       ],
  //       "nutritional_info": {
  //         "calories": 350,
  //         "protein": "30g",
  //         "carbohydrates": "15g",
  //         "fats": "18g",
  //         "sugar": "8g",
  //         "fiber": "5g"
  //       },
  //       "preparation_instructions": [
  //         "In a large bowl, combine mixed greens, cherry tomatoes, cucumber, and bell pepper.",
  //         "Top with grilled chicken breast slices.",
  //         "Drizzle vinaigrette dressing over the salad and toss gently to combine."
  //       ],
  //       "estimated_cost": "$12 - $15",
  //       "time_to_prepare": "15 minutes",
  //       "servings": 1
  //     },
  //     {
  //       "meal_time": "Dinner",
  //       "recipe_name": "Baked Salmon with Roasted Vegetables",
  //       "description": "A flavorful and nutritious dinner option featuring oven-baked salmon fillet served with a side of assorted roasted vegetables.",
  //       "ingredients": [
  //         {
  //           "ingredient": "Salmon fillet",
  //           "amount": "6 oz"
  //         },
  //         {
  //           "ingredient": "Broccoli florets",
  //           "amount": "1 cup"
  //         },
  //         {
  //           "ingredient": "Carrot sticks",
  //           "amount": "1/2 cup"
  //         },
  //         {
  //           "ingredient": "Red bell pepper",
  //           "amount": "1/2"
  //         },
  //         {
  //           "ingredient": "Olive oil",
  //           "amount": "1 tbsp"
  //         },
  //         {
  //           "ingredient": "Lemon wedges",
  //           "amount": "2"
  //         }
  //       ],
  //       "categories": [
  //         "Omega-3-rich",
  //         "Dinner",
  //         "Low carb"
  //       ],
  //       "nutritional_info": {
  //         "calories": 400,
  //         "protein": "28g",
  //         "carbohydrates": "20g",
  //         "fats": "22g",
  //         "sugar": "8g",
  //         "fiber": "6g"
  //       },
  //       "preparation_instructions": [
  //         "Preheat the oven to 400°F (200°C).",
  //         "Place salmon fillet on a baking sheet and surround it with broccoli, carrot, and red bell pepper.",
  //         "Drizzle olive oil over the salmon and vegetables, season with salt and pepper.",
  //         "Bake for 15-20 minutes until the salmon is cooked through and vegetables are tender.",
  //         "Serve with lemon wedges on the side."
  //       ],
  //       "estimated_cost": "$18 - $25",
  //       "time_to_prepare": "25 minutes",
  //       "servings": 1
  //     }
  //   ]
  // };

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
