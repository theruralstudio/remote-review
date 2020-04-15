import React, {Component} from 'react';
import Layout from '../layouts/Layout';
import RegisterPanel from '../components/RegisterPanel';

class Register extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.state = {
    //   name: '',
    //   entrycode: ''
    // }
  };

  render() {
    return (
      <RegisterPanel />
    );
  }
}

export default Register;