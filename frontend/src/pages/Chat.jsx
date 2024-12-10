import React, { useState } from "react";
// Uncomment when ready to use an actual API
// import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Mock AI Responses for Demo
  const mockResponses = {
    "Hi, how are you?": "I'm just a program, but I'm here to help! How can I assist you today?",
    "Can you explain how gravity works?": "Sure! Gravity is a force that pulls two objects toward each other. It's why objects fall to the ground and why planets orbit the sun. The strength of gravity depends on the mass of the objects and the distance between them.",
    "What’s the capital of France?": "The capital of France is Paris.",
    "Thanks! That’s all for now.": "You’re welcome! Feel free to ask anything anytime. Have a great day!",
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Simulate AI Response
    setTimeout(() => {
      const aiResponseText =
        mockResponses[input.trim()] || "Sorry, I don't have an answer for that.";
      const aiMessage = { sender: "ai", text: aiResponseText };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 500);

    // Uncomment the below code for actual API calls
    /*
    try {
      const response = await axios.post(
        "https://api.gemini.com/v1/chat",
        {
          prompt: input,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_GEMINI_API_KEY`,
          },
        }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.choices[0].text.trim(),
      };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
    */

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {message.sender === "user" ? (
                <img
                  src="https://via.placeholder.com/40x40?text=U"
                  alt="User Icon"
                  className="rounded-full"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/40x40?text=AI"
                  alt="AI Icon"
                  className="rounded-full"
                />
              )}
            </div>
            {/* Message Bubble */}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
