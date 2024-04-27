import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import express, { text } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;
const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.GOOGLEAI_API_KEY;

app.use(express.json());
app.use(cors());


app.listen(3000, () => {
  console.log(`Google AI API is listening on PORT :${port} `);
});
