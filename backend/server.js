const express = require('express');

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const { generateMessage, continueConversation } = require('./PalmModel/PalmServices.js');

const { generateContentWithModel } = require('./GeminiModel/GeminiModel.js');
const { determineRole } = require('./GeminiModel/determineRole.js');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/api/messages', async (req, res) => {
    try {
        const { prompt } = req.body;
        const role = determineRole(prompt);
        const text = await generateContentWithModel(prompt, role);
        res.json({ message: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Error generating content');
    }
});

app.post('/api/generateMessage', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await generateMessage(prompt);
        console.log("Response in Server: ",response);
        res.json(response);
    } catch (error) {
        console.error('Error generating message:', error);
        res.status(500).send('Error generating message');
    }
});

app.post('/api/continueConversation', async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await continueConversation(messages);
        res.json(response);
    } catch (error) {
        console.error('Error continuing conversation:', error);
        res.status(500).send('Error continuing conversation');
    }
});

app.post('/api/gpt2model', async (req, res) => {
    try {
        const { prompt } = req.body; // Assuming the frontend sends a prompt

        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2-xl", // Correct model endpoint
            {
                headers: { 'Authorization': `Bearer ${process.env.HF_API_KEY}` }, // Use an environment variable
                method: "POST",
                body: JSON.stringify({ inputs: prompt }), // Adjust the body format as per the API docs
            }
        );
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const result = await response.json();
        console.log('GPT2 response from server: ', result[0].generated_text);
        res.json(result[0].generated_text); // Send the result back to the frontend
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('Error generating response');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
