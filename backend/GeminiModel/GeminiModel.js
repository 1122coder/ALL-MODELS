const { GoogleGenerativeAI } = require('@google/generative-ai');
const { generationConfig } = require('../GeminiModel/generationConfig');
require('dotenv').config();

async function generateContentWithModel(prompt, role) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro", generationConfig });
    const rolePrompt = `[Role: ${role}] ${prompt}`;
    const result = await model.generateContent(rolePrompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

module.exports = { generateContentWithModel };