import express, { response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
// Pass through the environment variables to the openAi client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create new Instance of the OpenAI API
const openAi = new OpenAIApi(configuration);

// Create a new express app instance
const app = express();

// Enable cors
app.use(cors());

// Enable json parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World!",
  });
});

// Define the /api/openai endpoint
app.post("/", async (req, res) => {
try {
    const prompt = req.body.prompt;
    const response = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,   
        // temperature is the level of randomness in the output
        temperature: 1,
        // maxTokens is the maximum number of tokens to generate
        maxTokens: 3000,
        // topP is the probability of using one of the top tokens
        top_p: 1,
        // frequency penalty means wont repeat similar sentences often when asked the same question
        frequencyPenalty: 0.5,
        // presence penalty means wont repeat similar sentences often
        presencePenalty: 0,
    });

    res.status(200).send({
        bot: response.data.choices[0].text,
    });
}catch  (error) {
    console.log(error);
    res.status(500).send({
        message: "Internal Server Error",
    });
    };
});




// Define the port to listen on
const port = 3000;
