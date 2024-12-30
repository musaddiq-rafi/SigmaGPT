import React, { useRef } from 'react';
const ChatForm = ({chatHistory,setChatHistory, generateBotResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = ""; // clear the input field

        //Update chat history with users message
        setChatHistory(history => [...history,{role: "user" , text : userMessage}]);
        //Add a thinking message for the bot
        setTimeout(() => {
            setChatHistory(history => [...history, {role: "model", text: "Thinking... "}]);
            //call the function to generate the bot response
            generateBotResponse([...chatHistory, {role: "user", text: `using the details provided above, please address the provided query ${userMessage} `}]);
        }, 600);
       
    }; 
  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
            <button class="material-symbols-outlined">
            arrow_upward
            </button>
            </form>
  )
}

export default ChatForm