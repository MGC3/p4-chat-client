import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { updateChatRoom } from '../../api/chatrooms';
import messages from '../AutoDismissAlert/messages';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateChatRoom extends Component {
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

  onUpdateChatRoom = event => {
    event.preventDefault();

    const { alert, history, user, location } = this.props;

    updateChatRoom(this.state, location.state.chatRoomId, user)
      .then(() =>
        alert({
          heading: 'Update ChatRoom Success',
          message: messages.updateChatRoomSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/home'))
      .catch(() => {
        this.setState({ name: '' });
        alert({
          heading: 'Update ChatRoom Failed',
          message: messages.updateChatRoomFailure,
          variant: 'danger'
        });
      });
  };

  render() {
    const { name } = this.state;

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Update ChatRoom</h3>
          <Form onSubmit={this.onUpdateChatRoom}>
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
            <Link to="/home">Go Back</Link>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateChatRoom);
