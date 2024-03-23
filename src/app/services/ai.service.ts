import { Injectable } from '@angular/core';
import OpenAI from "openai";

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
}
