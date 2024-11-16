import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';  // Ensure you have installed the uuid package with `npm install uuid`
import './Appuse.css';
import axios from 'axios';

const App = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chatResponse, setChatResponse] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  // Load the last active session on component mount
  useEffect(() => {
    const activeSession = JSON.parse(localStorage.getItem('activeSession'));
    if (activeSession) {
      setSessionId(activeSession.id);
      setCompanyName(activeSession.name);
      setCompanyDescription(activeSession.description);
      setChatHistory(activeSession.history || []);
      setIsSubmitted(true);
    }
  }, []);

  // Save the active session to localStorage and update session history
  const saveChatSession = (sessionId, name, description, history) => {
    const session = {
      id: sessionId,
      name,
      description,
      history,
      date: new Date().toISOString(),
    };

    // Save current session as active session
    localStorage.setItem('activeSession', JSON.stringify(session));

    // Add session to the session history array in localStorage
    const sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || [];
    const sessionExists = sessionHistory.find(s => s.id === sessionId);

    if (!sessionExists) {
      sessionHistory.push(session);
      localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
    } else {
      // Update session if it already exists in sessionHistory
      const updatedHistory = sessionHistory.map(s => s.id === sessionId ? session : s);
      localStorage.setItem('sessionHistory', JSON.stringify(updatedHistory));
    }
  };

  // Handle initial analysis when Analyze button is clicked
  const handleAnalyze = async () => {
    if (companyName.trim() && companyDescription.trim()) {
      setIsSubmitted(true);

      // Generate a new session ID if none exists
      const newSessionId = sessionId || uuidv4();
      setSessionId(newSessionId);

      try {
        const response = await axios.post('http://localhost:5001/analyze', {
          company_name: companyName,
          company_description: companyDescription,
        });

        if (response.data) {
          if (response.data.result) {
            const botMessage = response.data.result;
            setChatResponse(botMessage);

            // Update the chat history with user and bot messages
            const updatedHistory = [
              ...chatHistory,
              { sender: 'user', message: `Company: ${companyName}, Description: ${companyDescription}` },
              { sender: 'bot', message: botMessage },
            ];
            setChatHistory(updatedHistory);
            saveChatSession(newSessionId, companyName, companyDescription, updatedHistory);
          } else if (response.data.error) {
            const errorMessage = `Error: ${response.data.error}`;
            setChatResponse(errorMessage);

            // Update the chat history with the error message
            const updatedHistory = [
              ...chatHistory,
              { sender: 'user', message: `Company: ${companyName}, Description: ${companyDescription}` },
              { sender: 'bot', message: errorMessage },
            ];
            setChatHistory(updatedHistory);
            saveChatSession(newSessionId, companyName, companyDescription, updatedHistory);
          }
        }
      } catch (error) {
        console.error('Error while analyzing:', error);
        const errorMessage = 'An error occurred while analyzing. Please try again.';
        setChatResponse(errorMessage);

        // Update the chat history with the error
        const updatedHistory = [
          ...chatHistory,
          { sender: 'user', message: `Company: ${companyName}, Description: ${companyDescription}` },
          { sender: 'bot', message: errorMessage },
        ];
        setChatHistory(updatedHistory);
        saveChatSession(newSessionId, companyName, companyDescription, updatedHistory);
      }
    } else {
      // Handle validation errors
      const validationError = 'Please provide both company name and description.';
      setChatResponse(validationError);

      // Optionally, update chat history with validation error
      const updatedHistory = [
        ...chatHistory,
        { sender: 'bot', message: validationError },
      ];
      setChatHistory(updatedHistory);
    }
  };

  // Handle user messages after initial analysis
  const handleUserMessageSubmit = () => {
    if (userMessage.trim()) {
      const newChatHistory = [
        ...chatHistory,
        { sender: 'user', message: userMessage },
      ];

      // Placeholder bot response (you can replace this with actual logic or API calls)
      const botResponse = `You asked about "${userMessage}". I'll help with that soon!`;
      newChatHistory.push({ sender: 'bot', message: botResponse });

      setChatHistory(newChatHistory);
      saveChatSession(sessionId, companyName, companyDescription, newChatHistory);

      setUserMessage('');
    }
  };

  // Start a new session
  const startNewSession = () => {
    // Clear current session and start a new one
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setCompanyName('');
    setCompanyDescription('');
    setChatHistory([]);
    setIsSubmitted(false);
    setChatResponse('');
    setUserMessage('');
    localStorage.removeItem('activeSession');
  };

  return (
    <div className="containerchat">
      <div className="fixed-background"></div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="heading"
      >
        Legal Minds
      </motion.h1>

      {!isSubmitted ? (
        <div className="input-section">
          <motion.input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input-field"
          />
          <motion.textarea
            placeholder="Enter Company Description"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            className="textarea-field"
          />
          <motion.button
            onClick={handleAnalyze}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="analyze-button"
          >
            Analyze
          </motion.button>
        </div>
      ) : (
        <div className="chat-section">
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={chat.sender === 'user' ? 'user-message' : 'bot-message'}
              >
                <strong>{chat.sender === 'user' ? 'You: ' : 'Legal Mind: '}</strong>
                {chat.message}
              </div>
            ))}
          </div>

          <div className="message-input">
            <textarea
              placeholder="Type your question here..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="user-textarea"
            />
            <button onClick={handleUserMessageSubmit} className="send-button">
              Send
            </button>
          </div>

          <button onClick={startNewSession} className="new-session-button send-button">
            Start New Session
          </button>
        </div>
      )}
    </div>
  );
};

export default App;