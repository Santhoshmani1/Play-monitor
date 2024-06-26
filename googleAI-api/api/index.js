import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";

dotenv.config();
const app = express();
const port = 3000;
const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.GOOGLEAI_API_KEY;

app.use(express.json());
app.use(cors());
app.use(compression())

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chatInstructions = {
    role: "model",
    parts: [
      {
        text: `Divide the google play store mobile application reviews into fields->  
        Category : design/bug-fix/feature-request
        Title : Appropriate Title for the issue
        Return the json format with category,title fields. 
        Just the two fields and no other data is required
    `,
      },
    ],
  };

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
    systemInstruction: chatInstructions,
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get("/", (req, res) => {
  res.send("Welcome to Google AI API for Google Play Store Reviews");
});

app.post("/analyse", async (req, res) => {
  const userInput = req.body.userInput;

  try {
    const response = await runChat(userInput);
    if (response) {
      res.status(200).send({ data: response });
    }
  } catch (error) {
    console.log("Too many requests", error);
    res.status(500).send({
      error: error, message: "Too many requests, please try again",});
  }
});

app.listen(3000, () => {
  console.log(`Google AI API is listening on PORT :${port} `);
});
