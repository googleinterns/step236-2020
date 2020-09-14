import {findDocumentQuery} from './database/Queries';
import type {OAuthUserType} from './admin/FlowTypes';

const readUserDataFromDB = (user) => {
  if (user === null) {
    return Promise.resolve([]);
  }
  return findDocumentQuery('active-members', 'email', user.email);
};

const firebaseAuthenticator = {
  isAdmin: async function(user: OAuthUserType): boolean {
    const userData = readUserDataFromDB(user);
    return userData.length > 0 && userData[0].isAdmin;
  },

  isInviter: async function(user: OAuthUserType): boolean {
    if (user === null) {
      return false;
    }
    return user && user.email.split('@').pop() === 'google.com';
  },

  isUser: async function(user: OAuthUserType): boolean {
    // This is a special case for an inviter. They are not supposed to be
    // stored in database.
    const isInviter = await this.isInviter(user);
    if (isInviter) {
      return true;
    }
    const userData = await readUserDataFromDB(user);
    return userData.length > 0;
  },
};

export default firebaseAuthenticator;

//export function AuthUserContext = { }
