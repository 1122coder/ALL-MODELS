import React, { useState } from 'react';
import '../Style/GPT2Page.css'; 

const GPT2Page = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        const trimmedInput = input.trim();
        console.log(trimmedInput)
        if (trimmedInput) {
            setMessages(prev => [...prev, { content: trimmedInput, sender: 'user' }]);
            setInput('');

            try {
                const response = await fetch('http://localhost:5000/api/gpt2model', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: trimmedInput }),
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                console.log('response in frontend', data)
                // If the GPT-2 response structure includes a 'generated_text' property
                setMessages(prev => [...prev, { content: data, sender: 'gpt2' }]);
            } catch (error) {
                console.error("Error fetching response:", error);
            }
        }
    };

    return (
        <div className="gpt2-container"> {/* Update the class name */}
            <h1>Let's talk with GPT-2</h1>
            <div className="conversation-box">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender === 'user' ? 'user-msg' : 'gpt2-msg'}>{msg.content}</p>
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

export default GPT2Page;