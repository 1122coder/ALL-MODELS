import React from "react";
import '../Style/LLMButtons.css'
function LLMButtons() {
    const models = ["Gemini", "Palm", "GPT", "Claude 2", "LLama", "GPTJ"];
  
    return (
      <div className="button-container">
        {models.map((model) => (
          <button key={model}>{`${model} Model`}</button>
        ))}
      </div>
    );
  }
  
  export default LLMButtons;