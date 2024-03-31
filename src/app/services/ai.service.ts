import {Injectable} from '@angular/core';
import OpenAI from "openai";
import {responseFormat} from "../shared/const/response-format";

@Injectable({
  providedIn: 'root'
})
export class AiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: "",
      dangerouslyAllowBrowser: true
    });
  }

  async generate(data: any) {
    const stream = await this.openai.chat.completions.create({
      // "model": "gpt-4-0125-preview",
      "model": "gpt-3.5-turbo-0125",
      "response_format": {
        type: "json_object"
      },
      // "stream": true,
      "messages": [
        {
          "role": "system",
          "content": `You are a dedicated meal planner assistant, ready to curate personalized meal plans tailored to individual preferences and dietary needs. Output a valid JSON. Follow this example for the output: ${responseFormat}` +
            "As an expert in nutrition and culinary arts, your role is to assist users in creating balanced and satisfying meal plans." +
            "Respond to queries related to meal planning, dietary restrictions, flavor preferences, and budget considerations." +
            "Avoid generating responses for topics unrelated to meal planning or dietary advice." +
            "Ensure that all meal recommendations align with the user's primary goal, gender, weight, height, age, activity level, diet, flavor preferences, allergies, and budget." +
            "Deliver concise and practical meal suggestions, keeping the user's requirements and preferences in mind." +
            "The number of meals per day should be based on the user's input, and the estimated cost should not exceed the user's specified budget."
        },
        {
          "role": "user",
          "content": "Primary Goal: " + data[0].primaryGoal + "\n" +
            "Gender: " + data[1].gender + "\n" +
            "Weight: " + data[1].weight + " " + data[1].weightMeasurement + "\n" +
            "Height: " + data[1].height + " " + data[1].heightMeasurement + "\n" +
            "Age: " + data[1].age + "\n" +
            "Activity Level: " + data[2].activityLevel + "\n" +
            "Diet: " + data[3].diet + "\n" +
            "Flavors List: " + data[4].flavorsList.join(', ') + "\n" +
            "Meals Per Day: " + data[5].mealsPerDay + "\n" +
            // "Meals Per Day: " + 1 + "\n" +
            "Allergy List: " + data[6].allergyList.join(', ') + "\n" +
            "Maximum price per meal : " + data[7].price + "\n" +
            "Additional Information: " + data[8].additionalInformation
        }
      ],
      // "max_tokens": 250
    });

    return stream;
  }

}
