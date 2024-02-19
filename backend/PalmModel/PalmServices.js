const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
require('dotenv').config();

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

async function generateMessage(promptContext) {
  const result = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.7,
    candidateCount: 1,
    prompt: promptContext,
  });
  const resultObject = typeof result === 'string' ? JSON.parse(result) : result;

  // Use optional chaining to safely access nested properties
  const content = resultObject[0]?.candidates?.[0]?.content;

  if (content) {
    return content;
  } else {
    // Handle the case where the content is not available
    throw new Error('No content available in the API response');
  }
}

async function continueConversation(messages) {
  const result = await client.generateMessage({
    model: MODEL_NAME,
    prompt: { messages },
  });

  return result[0].candidates[0].content;
}


module.exports = { generateMessage, continueConversation };
