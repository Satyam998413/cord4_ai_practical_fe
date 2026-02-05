import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../const/api';

function ConversationList({ selectedConversation, setSelectedConversation }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/conversations`)
      .then(res => setConversations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full h-screen bg-blue-50 border-r border-blue-100 overflow-y-auto shadow-lg">

      {/* Header */}
      <div className="p-5 bg-blue-100 shadow-md">
        <h2 className="text-xl font-bold text-blue-700 tracking-wide">
          Conversations
        </h2>
      </div>

      {/* List */}
      <div className="p-2 space-y-2">
        {conversations.map((conv, index) => (
          <div
            key={conv._id}
            onClick={() => setSelectedConversation(conv)}
            className={`
              p-4 rounded-xl cursor-pointer
              transition-all duration-300 ease-in-out
              transform hover:scale-105 hover:shadow-md
              ${selectedConversation?._id === conv._id
                ? 'bg-blue-200 shadow-lg'
                : 'bg-white hover:bg-blue-100'}
              animate-slideIn
            `}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <p className="font-semibold text-blue-800">
              {conv.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversationList;
