class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleUserMessage = async (message) => {
    const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

    try {
      const response = await fetch(`${RENDER_BACKEND_URL}/api/chatbot/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message }),
      });

      const data = await response.json();
      const botMessage = this.createChatBotMessage(data.answer || "Sorry, I had trouble thinking of a response.");
      
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));

    } catch (error) {
      console.error("Chatbot API error:", error);
      const errorMessage = this.createChatBotMessage("I'm having trouble connecting to my brain right now. Please try again later.");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };
}

export default ActionProvider;