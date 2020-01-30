import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { createChatRoom } from '../../api/chatrooms';
import messages from '../AutoDismissAlert/messages';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CreateChatRoom extends Component {
  constructor() {
    super();

    this.state = {
      name: ''
    };
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  onCreateChatRoom = event => {
    event.preventDefault();

    const { alert, history, user } = this.props;

    createChatRoom(this.state, user)
      .then(() =>
        alert({
          heading: 'Create ChatRoom Success',
          message: messages.createChatRoomSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/home'))
      .catch(() => {
        this.setState({ name: '' });
        alert({
          heading: 'Create ChatRoom Failed',
          message: messages.createChatRoomFailure,
          variant: 'danger'
        });
      });
  };

  render() {
    const { name } = this.state;

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create ChatRoom</h3>
          <Form onSubmit={this.onCreateChatRoom}>
            <Form.Group controlId="name">
              <Form.Label>ChatRoom name</Form.Label>
              <Form.Control
                required
                name="name"
                value={name}
                type="text"
                placeholder="ChatRoom name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateChatRoom);
