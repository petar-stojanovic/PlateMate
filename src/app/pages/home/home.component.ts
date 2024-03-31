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

  // aiResponse: AiResponse | null = null;
  aiResponse: AiResponse | null = {
    meals: [
      {
        "meal_time": "Breakfast",
        "recipe_name": "Spicy Veggie Omelette",
        "description": "A flavorful and protein-rich omelette with bell peppers, onions, tomatoes, spinach, and cheese, seasoned with chili flakes.",
        "ingredients": [
          {
            "ingredient": "Eggs",
            "amount": "2"
          },
          {
            "ingredient": "Bell peppers",
            "amount": "1/2 cup, chopped"
          },
          {
            "ingredient": "Onions",
            "amount": "1/4 cup, chopped"
          },
          {
            "ingredient": "Tomatoes",
            "amount": "1/4 cup, chopped"
          },
          {
            "ingredient": "Spinach",
            "amount": "1/2 cup"
          },
          {
            "ingredient": "Cheese",
            "amount": "2 tbsp"
          },
          {
            "ingredient": "Chili flakes",
            "amount": "1 tsp"
          },
          {
            "ingredient": "Salt",
            "amount": "to taste"
          },
          {
            "ingredient": "Black pepper",
            "amount": "to taste"
          }
        ],
        "nutritional_info": {
          "calories": 350,
          "protein": "25g",
          "carbohydrates": "10g",
          "fats": "20g",
          "sugar": "5g"
        },
        "preparation_instructions": [
          "Beat the eggs in a bowl and season with salt and pepper.",
          "Heat a non-stick pan and add bell peppers, onions, and tomatoes. Cook for 2 minutes.",
          "Add spinach and chili flakes, cook for another minute.",
          "Pour the beaten eggs over the veggies in the pan. Sprinkle cheese on top.",
          "Cook until the omelette is set. Fold in half and serve hot."
        ],
        "estimated_cost": "$8"
      },
      {
        "meal_time": "Lunch",
        "recipe_name": "Grilled Chicken Salad",
        "description": "A refreshing and protein-packed salad with grilled chicken breast, fresh vegetables, and a zesty dressing.",
        "ingredients": [
          {
            "ingredient": "Chicken breast",
            "amount": "1"
          },
          {
            "ingredient": "Lettuce",
            "amount": "2 cups"
          },
          {
            "ingredient": "Cherry tomatoes",
            "amount": "1/2 cup"
          },
          {
            "ingredient": "Cucumbers",
            "amount": "1/2 cup, sliced"
          },
          {
            "ingredient": "Red onions",
            "amount": "2 tbsp, thinly sliced"
          },
          {
            "ingredient": "Olive oil",
            "amount": "1 tbsp"
          },
          {
            "ingredient": "Lemon juice",
            "amount": "1 tbsp"
          },
          {
            "ingredient": "Garlic powder",
            "amount": "1/2 tsp"
          },
          {
            "ingredient": "Paprika",
            "amount": "1/2 tsp"
          },
          {
            "ingredient": "Salt",
            "amount": "to taste"
          },
          {
            "ingredient": "Black pepper",
            "amount": "to taste"
          }
        ],
        "nutritional_info": {
          "calories": 400,
          "protein": "30g",
          "carbohydrates": "15g",
          "fats": "25g",
          "sugar": "5g"
        },
        "preparation_instructions": [
          "Season the chicken breast with garlic powder, paprika, salt, and black pepper. Grill until cooked through.",
          "In a bowl, combine lettuce, cherry tomatoes, cucumbers, and red onions.",
          "Slice the grilled chicken and add to the salad.",
          "Drizzle olive oil and lemon juice over the salad. Toss well before serving."
        ],
        "estimated_cost": "$12"
      },
      {
        "meal_time": "Dinner",
        "recipe_name": "Spicy Turkey Stir-Fry",
        "description": "A quick and easy stir-fry recipe with ground turkey and colorful vegetables, seasoned with soy sauce and sriracha sauce.",
        "ingredients": [
          {
            "ingredient": "Ground turkey",
            "amount": "200g"
          },
          {
            "ingredient": "Broccoli",
            "amount": "1 cup, chopped"
          },
          {
            "ingredient": "Bell peppers",
            "amount": "1/2 cup, sliced"
          },
          {
            "ingredient": "Carrots",
            "amount": "1/2 cup, sliced"
          },
          {
            "ingredient": "Soy sauce",
            "amount": "2 tbsp"
          },
          {
            "ingredient": "Sriracha sauce",
            "amount": "1 tbsp"
          },
          {
            "ingredient": "Garlic",
            "amount": "2 cloves, minced"
          },
          {
            "ingredient": "Ginger",
            "amount": "1 tsp, grated"
          },
          {
            "ingredient": "Cooking oil",
            "amount": "1 tbsp"
          },
          {
            "ingredient": "Salt",
            "amount": "to taste"
          },
          {
            "ingredient": "Black pepper",
            "amount": "to taste"
          }
        ],
        "nutritional_info": {
          "calories": 450,
          "protein": "35g",
          "carbohydrates": "20g",
          "fats": "22g",
          "sugar": "8g"
        },
        "preparation_instructions": [
          "Heat oil in a pan, add minced garlic and ginger. Saute until fragrant.",
          "Add ground turkey and cook until browned.",
          "Stir in soy sauce and sriracha sauce.",
          "Add vegetables and cook until tender-crisp.",
          "Season with salt and black pepper. Serve hot."
        ],
        "estimated_cost": "$15"
      },
      {
        "meal_time": "Snack",
        "recipe_name": "Spicy Roasted Chickpeas",
        "description": "A crunchy and flavorful snack that is high in protein and fiber. Perfect for satisfying your mid-day cravings.",
        "ingredients": [
          {
            "ingredient": "Canned chickpeas",
            "amount": "1 can (400g), drained and rinsed"
          },
          {
            "ingredient": "Olive oil",
            "amount": "1 tbsp"
          },
          {
            "ingredient": "Cayenne pepper",
            "amount": "1/2 tsp"
          },
          {
            "ingredient": "Cumin",
            "amount": "1/2 tsp"
          },
          {
            "ingredient": "Paprika",
            "amount": "1/2 tsp"
          },
          {
            "ingredient": "Salt",
            "amount": "to taste"
          }
        ],
        "nutritional_info": {
          "calories": 200,
          "protein": "10g",
          "carbohydrates": "30g",
          "fats": "5g",
          "sugar": "5g"
        },
        "preparation_instructions": [
          "Preheat the oven to 200°C (400°F).",
          "Pat dry the chickpeas with a paper towel to remove excess moisture.",
          "In a bowl, toss chickpeas with olive oil, cayenne pepper, cumin, paprika, and salt.",
          "Spread the chickpeas on a baking sheet and roast for 30-40 minutes until crispy.",
          "Let them cool before serving."
        ],
        "estimated_cost": "$5"
      }
    ]
  };

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
