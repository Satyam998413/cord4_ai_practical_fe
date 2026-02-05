import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../const/api';

function MessageList({ selectedConversation }) {
  const [messages, setMessages] = useState([]);

  const currentUser = "You"; // Replace with logged-in user name or ID

  useEffect(() => {
    if (!selectedConversation) return;

    axios.get(`${apiUrl}/messages/${selectedConversation._id}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, [selectedConversation]);

  return (
    <div className="w-full h-screen bg-blue-50 p-6 overflow-y-auto flex flex-col">

      {!selectedConversation && (
        <div className="flex items-center justify-center h-full text-blue-400 text-lg">
          Select a conversation to start chatting 💬
        </div>
      )}

      {messages.map((msg, index) => {
        const isOwnMessage = msg.sender === currentUser;

        return (
          <div
            key={msg._id}
            className={`flex mb-4 animate-fadeUp ${
              isOwnMessage ? 'justify-end' : 'justify-start'
            }`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div
              className={`
                p-4 rounded-2xl shadow-md max-w-xs md:max-w-md
                transition-all duration-300 hover:scale-[1.02]
                ${isOwnMessage
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-blue-900 rounded-bl-none border border-blue-100'}
              `}
            >
              <p className={`text-md mb-1 font-semibold ${
                isOwnMessage ? 'text-blue-100' : 'text-blue-600'
              }`}>
                {msg.sender}
              </p>

              <p className="text-sm leading-relaxed">
                {msg.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
