import {findDocumentQuery} from './database/Queries';
import type {OAuthUserType, UserType} from './admin/FlowTypes';

const readUserDataFromDB = (user) => {
  if (user === null) {
    return Promise.resolve([]);
  }
  return findDocumentQuery('active-members', 'email', user.email);
};

const firebaseAuthenticator = {
  isAdmin: function(user: OAuthUserType): Promise<boolean> {
    let userDataPromise = readUserDataFromDB(user);
    if (userDataPromise) {
      return userDataPromise.then(
          (userData: Array<UserType>) =>
              Promise.resolve(userData.length > 0 && userData[0].isAdmin)
          );
    } else {
      return Promise.resolve(false);
    }
  },

  isUser: function(user: OAuthUserType): Promise<boolean> {
    let userDataPromise = readUserDataFromDB(user);
    if (userDataPromise) {
      return userDataPromise.then((userData: Array<UserType>) =>
          userData.length > 0);
    } else {
      return Promise.resolve(false);
    }
  },

  isInviter: function(user: OAuthUserType): boolean {
    if (user === null) {
      return false;
    }
    return user && user.email.split('@').pop() === 'google.com';
  },
};

export default firebaseAuthenticator;
