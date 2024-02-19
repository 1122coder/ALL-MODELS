const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 500,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};

module.exports = { generationConfig };