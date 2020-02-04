import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { signOut } from '../../api/auth';
import messages from '../AutoDismissAlert/messages';
import doorslam from '../../audio/doorslam.wav';
let doorSlam = new Audio(doorslam);

const SignOut = ({ alert, history, clearUser, user }) => {
  useEffect(() => {
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
  }, []);

  return '';
};

export default withRouter(SignOut);
