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
    this.props.sendMessage();
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form id="chat-input" onSubmit={this.handleSubmit}>
          <input className="text-input"
            type="text" 
            value={this.props.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Send" />
        </form>
        <style jsx>{`
          #chat-input {
            display: flex;
            background: white;
            justify-content: space-between;
            border-top: 1px solid black;
          }

          input {
            margin: 0.5em;
          }

          .text-input {
            width: 100
          }
        `}</style>
      </div>
    )
  }
}

export default ChatInput;

