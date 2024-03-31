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
                string, // Step 1
                string, // Step 2
                ...     // Additional steps as detailed as possible
            ]
            "estimated_cost": string,
            "time_to_prepare": string,
            "servings": number
        },
    ]
}
`
