class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // This is where the magic happens. We just pass the user's message
    // to our ActionProvider, which will then call the backend.
    this.actionProvider.handleUserMessage(message);
  }
}

export default MessageParser;