import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../const/api';

function MessageList({ selectedConversation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedConversation) return;

    axios.get(`${apiUrl}/messages/${selectedConversation._id}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, [selectedConversation]);

  return (
    <div className="w-full h-screen bg-blue-50 p-6 overflow-y-auto">

      {!selectedConversation && (
        <div className="flex items-center justify-center h-full text-blue-400 text-lg">
          Select a conversation to start chatting 💬
        </div>
      )}

      {messages.map((msg, index) => (
        <div
          key={msg._id}
          className="mb-4 animate-fadeUp"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="bg-blue-100 text-blue-900 p-4 rounded-2xl shadow-md max-w-lg transition-all duration-300 hover:scale-[1.02]">
            <p className="text-sm font-bold mb-1 text-blue-700">
              {msg.sender}
            </p>
            <p className="text-sm leading-relaxed">
              {msg.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
