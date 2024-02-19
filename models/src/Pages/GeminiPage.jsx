import React, { useState } from 'react';
import '../Style/GeminiPage.css';

const GeminiPage = () => {
  const [messages, setMessages] = useState([]); // To store conversation messages
  const [input, setInput] = useState(""); // To store the current input from the text field

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      // Add user message to the conversation
      setMessages(prev => [...prev, { text: trimmedInput, sender: 'user' }]);
      setInput('');
  
      try {
        const response = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: trimmedInput,
          }),
        });
  
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
        const data = await response.json();
        setMessages(prev => [...prev, { text: data.message, sender: 'gemini' }]);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    }
  };

  return (
    <div className="gemini-container">
      <h1>Let's talk with Gemini</h1>
      <div className="conversation-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? 'user-msg' : 'gemini-msg'}>{msg.text}</p>
        ))}
      </div>
      <div className="input-container">
      <input 
        className="text-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message here..."
      />
      <button className='send-button' onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default GeminiPage;