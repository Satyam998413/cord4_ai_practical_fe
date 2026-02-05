import React, { createContext, useReducer } from 'react';

const ChatContext = createContext();

const initialState = {
  conversations: [],
  messages: [],
  selectedConversation: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };

    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };

    case 'SELECT_CONVERSATION':
      return { ...state, selectedConversation: action.payload };

    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
