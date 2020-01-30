import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { signOut } from '../../api/auth';
import messages from '../AutoDismissAlert/messages';
import doorslam from '../../audio/doorslam.wav';
let doorSlam = new Audio(doorslam);

class SignOut extends Component {
  componentDidMount() {
    const { alert, history, clearUser, user } = this.props;

    signOut(user)
      .finally(() =>
        alert({
          heading: 'Signed Out Successfully',
          message: messages.signOutSuccess,
          variant: 'success'
        })
      )
      .finally(() => history.push('/'))
      .finally(() => clearUser())
      .finally(() => doorSlam.play());
  }

  render() {
    return '';
  }
}

export default withRouter(SignOut);
