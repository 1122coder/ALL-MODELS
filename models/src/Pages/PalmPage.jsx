import React, { useState } from 'react';
import '../Style/PalmPage.css';

const PalmPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
  
    const handleSend = async () => {
      const trimmedInput = input.trim();
      if (trimmedInput) {
        // Add user message to the conversation
        setMessages(prev => [...prev, { content: trimmedInput, sender: 'user' }]);
        setInput('');
  
        try {
          // Assuming '/api/generateMessage' is your endpoint for generating responses
          const response = await fetch('http://localhost:5000/api/generateMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              // Adjust this payload according to your backend's expected format
              prompt: {
                messages: [{ content: trimmedInput }]
              },
            }),
          });
  
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
          const data = await response.json();
          // Assuming 'data.message' contains the model's response
          console.log('Response from backend:', data);

          setMessages(prev => [...prev, { content: data, sender: 'palm' }]);
        } catch (error) {
          console.error("Error fetching response:", error);
        }
      }
    };
  
    return (
      <div className="palm-container">
        <h1>Let's talk with Palm Model</h1>
        <div className="conversation-box">
          {messages.map((msg, index) => (
            <p key={index} className={msg.sender === 'user' ? 'user-msg' : 'palm-msg'}>{msg.content}</p>
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
  
  export default PalmPage;