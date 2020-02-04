import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { updateChatRoom } from '../../api/chatrooms';
import messages from '../AutoDismissAlert/messages';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateChatRoom = ({ alert, history, user, location }) => {
  const [formData, setFormData] = useState({ name: '' });

  const handleChange = event =>
    setFormData({
      [event.target.name]: event.target.value
    });

  const onUpdateChatRoom = event => {
    event.preventDefault();

    updateChatRoom(formData, location.state.chatRoomId, user)
      .then(() =>
        alert({
          heading: 'Update ChatRoom Success',
          message: messages.updateChatRoomSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/home'))
      .catch(() => {
        setFormData({ name: '' });
        alert({
          heading: 'Update ChatRoom Failed',
          message: messages.updateChatRoomFailure,
          variant: 'danger'
        });
      });
  };

  return (
    <Fragment>
      <h3>Update ChatRoom</h3>
      <Form onSubmit={onUpdateChatRoom}>
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

export default withRouter(UpdateChatRoom);
