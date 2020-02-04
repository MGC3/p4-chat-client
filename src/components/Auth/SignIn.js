import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { signIn } from '../../api/auth';
import messages from '../AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../../images/logo-splash.png';

const SignIn = ({ alert, history, setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const onSignIn = event => {
    event.preventDefault();

    signIn(formData)
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
        setFormData({ email: '', password: '' });
        alert({
          heading: 'Sign In Failed',
          message: messages.signInFailure,
          variant: 'danger'
        });
      });
  };

  return (
    <Fragment>
      <Image />
      <Form onSubmit={onSignIn}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
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
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            tabIndex="2"
          />
        </Form.Group>
        <Button tabIndex="3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default withRouter(SignIn);

const Image = styled.div`
  height: 200px;
  width: 100%;
  background-size: cover;
  background-image: url(${logo});
  background-color: rgba(255, 255, 255, 1);
`;
