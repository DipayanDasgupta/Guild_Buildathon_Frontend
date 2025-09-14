import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Insure-Agent AI';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. How can I help you use the dashboard today?`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#10b981', // Turtlemint Green
    },
    chatButton: {
      backgroundColor: '#10b981',
    },
  },
};

export default config;