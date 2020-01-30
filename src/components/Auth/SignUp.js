import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { signUp, signIn } from '../../api/auth';
import messages from '../AutoDismissAlert/messages';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      screenName: ''
    };
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  onSignUp = event => {
    event.preventDefault();

    const { alert, history, setUser } = this.props;

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() =>
        alert({
          heading: 'Sign Up Success',
          message: messages.signUpSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error);
        this.setState({
          email: '',
          password: '',
          passwordConfirmation: '',
          screenName: ''
        });
        alert({
          heading: 'Sign Up Failed',
          message: messages.signUpFailure,
          variant: 'danger'
        });
      });
  };

  render() {
    const { email, password, passwordConfirmation, screenName } = this.state;

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="screenName">
              <Form.Label>Screen Name</Form.Label>
              <Form.Control
                required
                name="screenName"
                value={screenName}
                type="text"
                placeholder="Screen Name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Link to="/-up">Go Back</Link>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
