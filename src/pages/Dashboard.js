import React, { useState } from 'react';
import ConversationList from '../components/ConversationList';
import MessageList from '../components/MessageList';

function Dashboard() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="h-screen flex bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 animate-fadeIn">

      {/* Sidebar */}
      <div className="w-1/3 border-r border-blue-200 backdrop-blur-md bg-white/70 shadow-xl transition-all duration-500">
        <ConversationList
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      </div>

      {/* Chat Section */}
      <div className="flex-1 backdrop-blur-md bg-white/60 transition-all duration-500">
        <MessageList
          selectedConversation={selectedConversation}
        />
      </div>

    </div>
  );
}

export default Dashboard;
