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
            "nutritional_info": {
              "calories": number,
              "protein": string,
              "carbohydrates": string,
              "fats": string,
              "sugar": string,
            },
             "preparation_instructions": [
                string, // Step 1
                string, // Step 2
                ...     // Additional steps
            ]
            "estimated_cost": string
        },
    ]
}
`
