const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5000;
const { Configuration, OpenAIApi } = require("openai");

app.get("/", (req, res) => {
  res.send("nfs is running GPT");
});

const configuration = new Configuration({
  organization: process.env.ORG,
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/message", async (req, res) => {
  const message = req.body.message;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.send({ message: response.data.choices[0].text });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`server running on ort: ${port}`);
});
