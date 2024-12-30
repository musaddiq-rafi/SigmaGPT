import React from 'react';
import chatbotImage from '../assets/sigmaMan.gif'; // Adjust the path as necessary

const ChatbotIcon = () => {
    return (
        <div>
            <img 
                src={chatbotImage} 
                alt="Chatbot Icon" 
                width="50" 
                height="50" 
                style={{ borderRadius: '50%' }} 
            />
        </div>
    );
}

export default ChatbotIcon;