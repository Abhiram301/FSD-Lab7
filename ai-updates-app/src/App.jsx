import React, { useState, useEffect, useRef } from 'react';
import { useChat } from './context/ChatContext';
import './App.css';

const SUGGESTED_PROMPTS = [
  "🎨 Latest image generation tools",
  "🎥 New video AI models in 2025",
  "💻 Best coding AI assistants",
  "🧠 LLM breakthroughs this month",
];

function TypingIndicator() {
  return (
    <div className="message bot-message">
      <div className="message-avatar bot-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
          <circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/>
          <path d="M9 14s1.5 2 3 2 3-2 3-2"/>
          <path d="M5 18v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>
        </svg>
      </div>
      <div className="message-content">
        <div className="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      {!isUser && (
        <div className="message-avatar bot-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
            <circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/>
            <path d="M9 14s1.5 2 3 2 3-2 3-2"/>
            <path d="M5 18v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>
          </svg>
        </div>
      )}
      <div className="message-content">
        <div className="message-bubble">
          {message.text}
        </div>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="message-avatar user-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          </svg>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const { messages, loading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      sendMessage(query.trim());
      setQuery("");
      inputRef.current?.focus();
    }
  };

  const handleSuggestion = (prompt) => {
    if (!loading) {
      sendMessage(prompt);
    }
  };

  return (
    <div className="app-container">
      {/* Animated background blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      <div className="chat-wrapper">
        {/* Header */}
        <header className="chat-header">
          <div className="header-left">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
                <circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/>
                <path d="M9 14s1.5 2 3 2 3-2 3-2"/>
                <path d="M5 18v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>
              </svg>
            </div>
            <div>
              <h1 className="header-title">AI Updates Bot</h1>
              <span className="header-status">
                <span className="status-dot"></span>
                Online • Powered by Gemini
              </span>
            </div>
          </div>
          {messages.length > 0 && (
            <button className="clear-btn" onClick={clearChat} title="Clear chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
              </svg>
            </button>
          )}
        </header>

        {/* Messages area */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
                  <circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/>
                  <path d="M9 14s1.5 2 3 2 3-2 3-2"/>
                  <path d="M5 18v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>
                </svg>
              </div>
              <h2>Welcome to AI Updates Bot</h2>
              <p>Ask me about the latest AI tools, models, and breakthroughs!</p>
              <div className="suggestions">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    className="suggestion-chip"
                    onClick={() => handleSuggestion(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}
              {loading && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form className="chat-input-area" onSubmit={handleSend}>
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about the latest AI tools..."
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="send-btn"
            >
              {loading ? (
                <div className="send-spinner"></div>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}