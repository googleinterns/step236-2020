import Cookies from 'js-cookie';

const mockAuth = {
  isAdmin: function() {
    let adminCookie = Cookies.get('admin');
    return (adminCookie !== undefined);
  },

  isUser: function() {
    let adminCookie = Cookies.get('user');
    return (adminCookie !== undefined);
  },

  logIn: function() {
    Cookies.set('user', 'user');
  },

  logOut: function() {
    Cookies.remove('user');
  },
};

// TODO: Add firebase authentication.
const scribaAuth = {};

export default mockAuth;
