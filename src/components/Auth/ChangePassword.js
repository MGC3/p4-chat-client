import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { changePassword } from '../../api/auth';
import messages from '../AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ChangePassword = ({ alert, history, user }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handleChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const onChangePassword = event => {
    event.preventDefault();

    changePassword(formData, user)
      .then(() =>
        alert({
          heading: 'Change Password Success',
          message: messages.changePasswordSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/home'))
      .catch(() => {
        setFormData({ oldPassword: '', newPassword: '' });
        alert({
          heading: 'Change Password Failed',
          message: messages.changePasswordFailure,
          variant: 'danger'
        });
      });
  };

  return (
    <Fragment>
      <h3>Change Password</h3>
      <Form onSubmit={onChangePassword}>
        <Form.Group controlId="oldPassword">
          <Form.Label>Old password</Form.Label>
          <Form.Control
            required
            name="oldPassword"
            value={formData.oldPassword}
            type="password"
            placeholder="Old Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            required
            name="newPassword"
            value={formData.newPassword}
            type="password"
            placeholder="New Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/home">Go Back</Link>
    </Fragment>
  );
};

export default withRouter(ChangePassword);
