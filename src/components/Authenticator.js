import Cookies from 'js-cookie';
import {auth, signInWithGoogle} from '../firebaseFeatures';
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
    return signInWithGoogle();
  },

  logOut: function() {
    auth.signOut().then(() => {console.log("User signed out.")});
  },
};

export const useFirebaseAuthentication = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() =>{
    return auth.onAuthStateChanged(
        (
            newAuthUser => {
          if (newAuthUser === authUser) {
            return;
          } else {
            setAuthUser(newAuthUser);
          }
        })
    );
  });
  return authUser;
};

export default mockAuth;
