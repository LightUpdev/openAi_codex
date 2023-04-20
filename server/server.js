import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
//open ai configuration settings
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello Codex!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openAi.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

// listening for requests()
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
