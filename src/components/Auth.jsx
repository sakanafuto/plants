import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const Auth = () => (
  <div>
    <AmplifySignOut />
  </div>
);

export default withAuthenticator(Auth);