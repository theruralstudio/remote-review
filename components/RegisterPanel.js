import React, {Component} from 'react';
import  { FirebaseContext, withFirebase } from './Firebase';


class RegisterPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      entrycode: '',
      activeuser: {
        name: '',
        style: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // console.log(e.target)
    this.setState({
      [name]: value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    // register user if the key matches 
    if (process.env.loginKeys.includes(this.state.entrycode)) {
      this.props.firebase.users().push({
        name: this.state.name,
        style: "TBD"
      });
    } else {
      // console.log("couldn't sign you in");
    };
        
    // set active user in state
    const style = {
      color: 'red',
      'font-family': '"Times New Roman", Times, serif'
    }

    // then clear state/ add active user
    this.setState({
      name: '',
      entrycode: '',
      activeuser: {
        name: this.state.name,
        style: style
      }
    })
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      // console.log(snapshot);
    });
  };

  render() {
    return (
      <div>
        <div id='register-form-container'>
          <form onSubmit={this.handleSubmit} id='register-form'>
            <label className='input'>
              Your Name:
              <input className='input'
                name="name" 
                type="text" 
                value={this.state.name} 
                onChange={this.handleChange} 
              />
            </label>
            <label className='input'>
              Entry Code:
              <input className='input'
                name="entrycode" 
                type="text" 
                value={this.state.entrycode} 
                onChange={this.handleChange} 
              />
            </label>
            <input className='submit-button' type="submit" value="Register" />
          </form>
        </div>
        <style jsx>{`
          .input {
            font-size: 2em;
            text-align: center;
            display: block;
            margin: 0.5em;
          }

          #register-form-container {
            display: flex;
            flex-grow: 2;
            justify-content: center;
            align-items: center;
          }

          #register-form {
            display: flex;
            flex-direction: column;
          }

          .submit-button {
            font-size: 2em;
            text-decoration: none;
            border: 2px solid black;
          }

      `}</style>
      </div>
    );
  }
}

export default withFirebase(RegisterPanel);