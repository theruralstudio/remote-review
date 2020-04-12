import React, { Component } from 'react';
import  { FirebaseContext, withFirebase } from './Firebase';

class ChatPanel extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      messages: [],
    }
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on('value', snapshot => {
      const msgObj = snapshot.val();
      const msgList = Object.keys(msgObj).map(key => ({
        uuid: key,
        body: msgObj[key],
      }));
      this.setState({
        messages: msgList,
        loading: false,
      });
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map(m => (
            <li key={matchMedia.uuid}>
              {m.body}
            </li>
          ))}
        </ul>
        <p>Your userkey is BLANK</p>
        <p>Your access code is </p>
      </div>
    )
  }
}

export default withFirebase(ChatPanel);

