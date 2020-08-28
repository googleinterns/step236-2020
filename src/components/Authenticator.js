import Cookies from 'js-cookie';

const mockAuth = {
  isAdmin: function() {
    const adminCookie = Cookies.get('admin');
    return (adminCookie !== undefined);
  },

  isUser: function() {
    const userCookie = Cookies.get('user');
    return (userCookie !== undefined);
  },

  isInviter: function() {
    const inviterCookie = Cookies.get('inviter');
    return (inviterCookie !== undefined);
  },

  logIn: function() {
    Cookies.set('user', 'user');
  },

  logOut: function() {
    Cookies.remove('user');
  },
};

// TODO: Add firebase authentication.

export default mockAuth;
