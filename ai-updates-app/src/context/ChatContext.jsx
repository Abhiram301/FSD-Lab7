import React, { createContext, useContext, useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const sendMessage = async (prompt) => {
        const userMessage = { role: 'user', text: prompt, timestamp: Date.now() };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `You are an expert in Data Science and Generative Artificial Intelligence. Provide the latest updates on AI tools based on this query: "${prompt}". Keep your response highly formatted and concise. Use bullet points and headers where appropriate.`,
            });
            const botMessage = { role: 'bot', text: response.text, timestamp: Date.now() };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching AI updates:", error);
            const errorMessage = { role: 'bot', text: "⚠️ Failed to retrieve updates. Check your API key or network connection.", timestamp: Date.now() };
            setMessages((prev) => [...prev, errorMessage]);
        }
        setLoading(false);
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <ChatContext.Provider value={{ messages, loading, sendMessage, clearChat, messagesEndRef }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used within a ChatProvider");
    return context;
};