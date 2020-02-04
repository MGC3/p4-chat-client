import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { signUp, signIn } from '../../api/auth';
import messages from '../AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = ({ alert, history, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    screenName: ''
  });

  const handleChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const onSignUp = event => {
    event.preventDefault();

    signUp(formData)
      .then(() => signIn(formData))
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
        setFormData({
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

  return (
    <Container>
      <h3>Sign Up</h3>
      <Form onSubmit={onSignUp}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
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
          />
        </Form.Group>
        <Form.Group controlId="screenName">
          <Form.Label>Screen Name</Form.Label>
          <Form.Control
            required
            name="screenName"
            value={formData.screenName}
            type="text"
            placeholder="Screen Name"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/">Go Back</Link>
    </Container>
  );
};

export default withRouter(SignUp);

const Container = styled.div`
  padding: 8px;
  margin: 8px;
`;
