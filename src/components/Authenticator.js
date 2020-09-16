// @flow
import {findUserByEmailQuery} from './database/Queries';
import type {OAuthUserType} from './types/FlowTypes';

const readUserDataFromDB = (user) => {
  if (user === null) {
    return Promise.resolve(null);
  }
  return findUserByEmailQuery(user.email);
};

const firebaseAuthenticator = {
  isAdmin: async function(user: OAuthUserType): Promise<boolean> {
    const userData = await readUserDataFromDB(user);
    return userData !== null && userData.isAdmin;
  },

  isInviter: async function(user: OAuthUserType): Promise<boolean> {
    return user && /@google.com\s*$/.test(user.email);
  },

  isUser: async function(user: OAuthUserType): Promise<boolean> {
    // This is a special case for an inviter. They are not supposed to be
    // stored in database.
    const isInviter = await this.isInviter(user);
    if (isInviter) {
      return true;
    }
    const userData = await readUserDataFromDB(user);
    return userData !== null;
  },
};

export default firebaseAuthenticator;
