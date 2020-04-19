import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../utils/firebase'
import 'firebase/database'
import { useList } from 'react-firebase-hooks/database'
import tinycolor from 'tinycolor2'

function RegisterPanel(props) {
  const [name, setName] = useState('')
  const [entryCode, setEntryCode] = useState('')

  // firebase
  const firebase = useContext(FirebaseContext)
  const ref = firebase.database().ref('users')

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //     entrycode: '',
  //   }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  // };

  // const handleChange = (e) => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;

  //   this.setState({
  //     [name]: value
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // register user in db if the key matches 
    if (process.env.loginKeys.includes(entryCode)) {
      
      // randomly create color pair
      const rand = Math.random() * 360;
      const fg = tinycolor({h: rand, s: 1, l: 0.25});
      const bg = tinycolor({h: rand, s: 1, l: 0.75});

      const style = {
        color: fg.toHexString(),
        background: bg.toHexString(),
        border: `1px solid ${fg.toHexString()}`,
      };

      // push to firebase
      ref.push({
        name: name,
        style: style
      });

      // pass state back up
      props.setUser({
        name: name,
        style: style
      });

    } else {
      // console.log("couldn't sign you in");
    };

    // then clear state/ add active user
    setName(null)
    setEntryCode(null)
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   this.props.firebase.users().on('value', snapshot => {
  //     // console.log(snapshot);
  //   });
  // };

  return (
    <div>
      <div id='register-form-container'>
        <form onSubmit={handleSubmit} id='register-form'>
          <label className='input'>
            Your Name:
            <input className='input'
              name="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </label>
          <label className='input'>
            Entry Code:
            <input className='input'
              name="entrycode" 
              type="text" 
              value={entryCode} 
              onChange={(e) => setEntryCode(e.target.value)} 
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

export default RegisterPanel;