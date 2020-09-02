import Cookies from 'js-cookie';
import {auth, signInWithGoogle, signOutFromGoogle} from '../firebaseFeatures';
import {useEffect, useState} from 'react';

const mockAuth = {
  isAdmin: function() {
    const adminCookie = Cookies.get('admin');
    return (adminCookie !== undefined);
  },

  isUser: function(user) {
    return user !== null;
  },

  isInviter: function() {
    const inviterCookie = Cookies.get('inviter');
    return (inviterCookie !== undefined);
  },

  logIn: function() {
    signInWithGoogle().then(() => {
      console.log('User logged in. Downloading their status from server...');
    });
  },

  logOut: function() {
    signOutFromGoogle().then(() => {
      console.log('User logged out.');
    });
  },
};

export const useFirebaseAuthentication = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(
        (
            newAuthUser => {
              if (newAuthUser === authUser) {

              } else {
                setAuthUser(newAuthUser);
              }
            }),
    );
  });
  return authUser;
};

export default mockAuth;
