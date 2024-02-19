import React from "react";
import { useNavigate } from "react-router-dom";
import '../Style/LLMButtons.css'
function LLMButtons() {
  const navigate = useNavigate();
    const models = ["Gemini", "Palm", "GPT", "Claude 2", "BERT", "GPTJ"];
    const handleNavigate = (model) =>{
      if (model =='Gemini'){
        navigate('/gemini');
      }else if (model == "Palm"){
        navigate("/palm");
      }else if (model == "GPT"){
        navigate("/gpt2");
    }
  }
  
    return (
      <div className="button-container">
        {models.map((model) => (
          <button key={model} onClick={() => handleNavigate(model)}>{`${model} Model`}</button>
        ))}
      </div>
    );
  }
  
  export default LLMButtons;