import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { signIn } from '../../api/auth';
import messages from '../AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../../images/logo-splash.png';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  onSignIn = event => {
    event.preventDefault();

    const { alert, history, setUser } = this.props;

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() =>
        alert({
          heading: 'Sign In Success',
          message: messages.signInSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/home'))
      .catch(() => {
        this.setState({ email: '', password: '' });
        alert({
          heading: 'Sign In Failed',
          message: messages.signInFailure,
          variant: 'danger'
        });
      });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Container>
        <Image></Image>
        <Form onSubmit={this.onSignIn}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={this.handleChange}
              tabIndex="1"
            />
            <Link tabIndex="4" to="/sign-up">
              Get an account
            </Link>
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
              tabIndex="2"
            />
          </Form.Group>
          <Button tabIndex="3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);

const Container = styled.div`
  padding: 8px;
  margin: 8px;
`;

const Image = styled.div`
  height: 200px;
  width: 100%;
  background-size: cover;
  background-image: url(${logo});
  background-color: rgba(255, 255, 255, 1);
`;
