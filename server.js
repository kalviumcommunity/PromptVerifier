const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in the .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const getLLMResponse = async (promptText) => {
    try {
        const result = await model.generateContent(promptText);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error.message);
        return `Error calling Gemini API: ${error.message}`;
    }
};

app.post('/run-test', async (req, res) => {
    const { instruction, exampleInput, actualInput } = req.body;
    
    let promptString = `${instruction}\n\n`;

    // Only add the example input if it's provided
    if (exampleInput) {
        promptString += `Input: ${exampleInput}\n\n`;
    }

    promptString += `Input: ${actualInput}\nOutput:`;

    const llmOutput = await getLLMResponse(promptString);

    res.json({
        llm_output: llmOutput
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});