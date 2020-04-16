import React, { Component } from 'react';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) {
    this.props.handleMessageChange(e.target.value);
  }

  handleSubmit(e) {
    this.props.sendMessage(e);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form id="chat-form" onSubmit={this.handleSubmit}>
          <input id="text-input"
            type="text" 
            value={this.props.value}
            onChange={this.handleChange}
            autoFocus
            placeholder="Type to chat..."
          />
          <input id="send-button" type="submit" value="Send" />
        </form>
        <style jsx>{`
          #chat-form {
            display: flex;
            margin: 1em;
            justify-content: space-between;
          }

          #text-input {
            padding: 0.75em;
            padding-left: 1em;
            outline: 0;
            border: 2px solid black;
            border-right: none;
            border-radius: 2em 0em 0em 2em;
            -webkit-appearance: none;
            appearance: none;
            flex-grow: 2;
          }

          input:focus {
            outline: 0 solid transparent;
          }

          #send-button {
            display: block;
            background: lime;
            border: 2px solid black;
            font-weight: bold;
            padding-right: 1em;
            border-radius: 0em 2em 2em 0em;
          }

          #send-button:active {
            background: black;
            color: white;
          }

        `}</style>
      </div>
    )
  }
}

export default ChatInput;

