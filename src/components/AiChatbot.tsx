"use client";
import { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { MessageSquare, X } from 'lucide-react';

import config from '../chatbot/config.js';
import MessageParser from '../chatbot/MessageParser.jsx';
import ActionProvider from '../chatbot/ActionProvider.jsx';

export function AiChatbot() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="chatbot-container">
      {showChatbot && (
        <div className="chatbot-window">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      <button 
        className="chatbot-fab" 
        onClick={() => setShowChatbot(!showChatbot)}
        aria-label="Toggle AI Assistant"
      >
        {showChatbot ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}