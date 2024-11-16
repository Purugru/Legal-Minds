import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';  // Install uuid package with `npm install uuid`
import './Appuse.css';

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

  // Handle initial output when Analyze button is clicked
  const handleAnalyze = () => {
    if (companyName && companyDescription) {
      setIsSubmitted(true);
      
      const newSessionId = sessionId || uuidv4();  // Generate new session ID if none exists
      setSessionId(newSessionId);

      const initialResponse = `Hello! I'm here to assist you with details regarding ${companyName}.`;
      const initialChatHistory = [{ sender: 'bot', message: initialResponse }];
      
      setChatResponse(initialResponse);
      setChatHistory(initialChatHistory);

      saveChatSession(newSessionId, companyName, companyDescription, initialChatHistory);
    }
  };

  // Handle response to user messages after initial output
  const handleUserMessageSubmit = () => {
    if (userMessage.trim()) {
      const newChatHistory = [
        ...chatHistory,
        { sender: 'user', message: userMessage },
      ];

      // Placeholder bot response
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
          />
          <motion.textarea
            placeholder="Enter Company Description"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
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
            />
            <button onClick={handleUserMessageSubmit} className="send-button">
              Send
            </button>
          </div><br></br>

          <button onClick={startNewSession} className="send-button">
            Start New Session
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
