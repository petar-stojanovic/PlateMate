export const responseFormat = `
{
    "meals" : [
        {
            "meal_time": "Breakfast" | "Lunch" | "Dinner" | "Snack",
            "recipe_name": string,
            "description": "string // Description of the meal in 2-3 sentences.",
            "ingredients": [
              {"ingredient": string, "amount": string},
              ...
            ],
            "categories": [
              string, // Category 1
              ...     // Additional categories/nutrition profiles
            ],
            "nutritional_info": {
              "calories": number,
              "protein": string,
              "carbohydrates": string,
              "fats": string,
              "sugar": string,
              "fiber": string
            },
             "preparation_instructions": [
                string, // Steps to prepare the meal. Make it as detailed as possible. Remember to include cooking time and temperature.
                ... // Example for Egg & Mushroom Puff Pastry Rolls:
                    // Step 1: Preheat oven to 400°F. Line a large rimmed baking sheet with parchment paper.
                    // Step 2: Heat oil in a large nonstick skillet over medium heat. Add mushrooms and cook, stirring frequently, until lightly browned, about 5 minutes. Remove from pan and set aside.
                    // Step 3: Wipe out the skillet and coat it with cooking spray; set over medium-low heat. Add eggs and cook, stirring often, until just set; sprinkle with salt and pepper.
                    // Step 4: Roll puff pastry on a lightly floured surface into a 9-by-11-inch rectangle. Lift the pastry and lay it flat again to keep it from sticking to your work surface. Spread the mushrooms and scrambled eggs evenly over the pastry. Starting at the short end, roll up the pastry jelly-roll-style. Sprinkle with pepper, if desired. Using a serrated knife, cut the log into 8 pieces. Place the pieces 3 inches apart on the prepared baking sheet. Bake until golden brown, 14 to 16 minutes. Top with chives, if desired.
                ...
            ]
            "estimated_cost": string,
            "time_to_prepare": string,
            "servings": number
        },
    ]
}
`
