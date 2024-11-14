import React, { useState, useEffect } from 'react';
import './Style.css';
import './History.css';

const History = () => {
  const [organizedSessions, setOrganizedSessions] = useState({
    today: [],
    yesterday: [],
    lastWeek: [],
    older: [],
  });
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const sessions = JSON.parse(localStorage.getItem('sessionHistory')) || [];
    const categorizedSessions = categorizeSessions(sessions);
    setOrganizedSessions(categorizedSessions);
  };

  const categorizeSessions = (sessions) => {
    const today = [];
    const yesterday = [];
    const lastWeek = [];
    const older = [];
    const currentDate = new Date();

    sessions.forEach((session) => {
      const sessionDate = new Date(session.date);
      const differenceInDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24));

      if (differenceInDays === 0) today.push(session);
      else if (differenceInDays === 1) yesterday.push(session);
      else if (differenceInDays <= 7) lastWeek.push(session);
      else older.push(session);
    });

    return { today, yesterday, lastWeek, older };
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('sessionHistory');
    localStorage.removeItem('activeSessionId');
    setOrganizedSessions({ today: [], yesterday: [], lastWeek: [], older: [] });
    setSelectedSession(null);
  };

  return (
    <div className="history-container">
      <h2>Session History</h2>
      <button onClick={handleClearHistory} className="clear-history-button">
        Clear History
      </button>
      <div className="session-lists">
        {['today', 'yesterday', 'lastWeek', 'older'].map((category) => (
          <div key={category} className="session-category">
            <h3>{category === 'today' ? 'Today' : category === 'yesterday' ? 'Yesterday' : category === 'lastWeek' ? 'Last Week' : 'Older'}</h3>
            {organizedSessions[category].map((session) => (
              <button
                key={session.id}
                className="session-summary"
                onClick={() => handleSessionSelect(session)}
              >
                {session.name} <br />
                <small>{new Date(session.date).toLocaleString()}</small>
              </button>
            ))}
          </div>
        ))}
      </div>

      {selectedSession && (
        <div className="session-history-display">
          <h3>Session with {selectedSession.name}</h3>
          {selectedSession.history.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
              <strong>{msg.sender === 'user' ? 'You: ' : 'Legal Mind: '}</strong>
              {msg.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
