export interface AiResponse {
  meals: Meal[]
}

export interface Meal {
  meal_time: string
  recipe_name: string
  description: string
  ingredients: Ingredient[]
  categories: string[]
  nutritional_info: NutritionalInfo
  preparation_instructions: string[]
  estimated_cost: string
  time_to_prepare: string
  servings: number
}

export interface Ingredient {
  ingredient: string
  amount: string
}

export interface NutritionalInfo {
  calories: number
  protein: string
  carbohydrates: string
  fats: string
  sugar: string
  fiber: string
}
