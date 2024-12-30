import React, { useState, useRef, useEffect } from 'react';
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { BotResponseInfo } from './components/botResponseDetails';

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: BotResponseInfo,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const ChatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    // Helper function to update the chat history with the bot's response
    const updateHistory = (text, isError = false)  => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking... "),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    console.log(history);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: history }),
    };

    try {
      // Make the API call and get the response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || 'Failed to generate response');
      console.log(data);

      // Extract the response text from the API response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat history when the component is updated
    if (ChatBodyRef.current) {
      ChatBodyRef.current.scrollTo({
        top: ChatBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistory]);

  return (
    <div className="main-container">
      {/* Hero Section */}
      <Hero />

      <div className={`container ${showChatbot ? "show-chatbot" : ""}`}> 
        <button onClick={()=>setShowChatbot(prev => !prev)} id="chatbot-toggler">
          <span className="material-symbols-rounded">
            mode_comment
          </span>

          <span className="material-symbols-rounded">
            close
          </span>
        </button>
        <div className="chatbot-popup">
          {/* Chatbot header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">SigmaGPT</h2>
            </div>
            <button onClick={()=>setShowChatbot(prev => !prev)} className="material-symbols-outlined">
              keyboard_arrow_down
            </button>
          </div>

          {/* Chatbot body */}
          <div ref={ChatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hi there!
                <br /> How can I help you today?
              </p>
            </div>
            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chatbot footer */}
          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;