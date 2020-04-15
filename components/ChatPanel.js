import React, { Component } from 'react';
import  { FirebaseContext, withFirebase } from './Firebase';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';

class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageToSend: '',
      loading: false,
      messages: [],
    }
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  };

  handleMessageChange(msg) {
    this.setState({messageToSend: msg});
  }

  sendMessage(event) {
    this.props.firebase.messages().push({
      user: "UnknownUser",
      body: this.state.messageToSend,
    });
    this.setState({messageToSend: ''}); // clear the input
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on('value', snapshot => {
      const msgObj = snapshot.val();
      const msgList = Object.keys(msgObj).map(key => ({
        uuid: key,
        user: msgObj[key].user,
        body: msgObj[key].body,
      }));
      this.setState({
        messages: msgList,
        loading: false,
      });
    });
  };

  render() {
    return (
      <div id="chatWrapper">
        <div id="chatMessages">
          {this.state.messages.map(m => (
            <div key={m.uuid} className="chatMessage">
              <div className="chatMessageUserName">{m.user}</div>
              {m.body}
            </div>
          ))}
        </div>
        <ChatInput
          value={this.state.messageToSend}
          handleMessageChange={this.handleMessageChange}
          sendMessage={this.sendMessage}
        />
        {/* <p>Your userkey is BLANK</p>
        <p>Your access code is </p> */}
        <style jsx>{`
          #chatWrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 2;
            overflow: hidden;
          }

          #chatMessages {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            flex-grow: 2;
            overflow: hidden;
          }

          .chatMessage {
            display: block;
            margin: 1em;
            padding: 0.5em;
            background: orange;
            max-width: 60%;
          }

          .chatMessageUserName {
            font-size: 0.6em;
            text-transform: uppercase;
            margin-bottom: 0.5em;
          }
        `}</style>
      </div>
    )
  }
}

export default withFirebase(ChatPanel);
