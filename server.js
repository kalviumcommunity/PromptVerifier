const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in the .env file.");
    process.exit(1);
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

// Middleware to parse JSON bodies and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Function to call the Gemini API with a single prompt string
const getLLMResponse = async (promptText) => {
    try {
        const result = await model.generateContent(promptText);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error.message);
        return `Error calling Gemini API: ${error.message}`;
    }
};

// Main API route to run the zero-shot test
app.post('/run-test', async (req, res) => {
    const fullPrompt = req.body.prompt;
    const llmOutput = await getLLMResponse(fullPrompt);

    res.json({
        llm_output: llmOutput
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});