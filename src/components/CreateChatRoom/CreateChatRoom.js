import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { createChatRoom } from '../../api/chatrooms';
import messages from '../AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateChatRoom = ({ alert, history, user }) => {
  const [formData, setFormData] = useState({ name: '' });

  const handleChange = event =>
    setFormData({
      [event.target.name]: event.target.value
    });

  const onCreateChatRoom = event => {
    event.preventDefault();

    createChatRoom(formData, user)
      .then(() =>
        alert({
          heading: 'Create ChatRoom Success',
          message: messages.createChatRoomSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/home'))
      .catch(() => {
        setFormData({ name: '' });
        alert({
          heading: 'Create ChatRoom Failed',
          message: messages.createChatRoomFailure,
          variant: 'danger'
        });
      });
  };

  return (
    <Fragment>
      <h3>Create ChatRoom</h3>
      <Form onSubmit={onCreateChatRoom}>
        <Form.Group controlId="name">
          <Form.Label>ChatRoom name</Form.Label>
          <Form.Control
            required
            name="name"
            value={formData.name}
            type="text"
            placeholder="ChatRoom name"
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

export default withRouter(CreateChatRoom);
