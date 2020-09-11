import {findUserByEmailQuery} from './database/Queries';
import type {OAuthUserType, UserType} from '../FlowTypes';

const readUserDataFromDB = (user) => {
  if (user === null) {
    return Promise.resolve(null);
  }
  return findUserByEmailQuery(user.email);
};

const firebaseAuthenticator = {
  isAdmin: function(user: OAuthUserType): Promise<boolean> {
    return readUserDataFromDB(user)
        .then((userData: UserType) =>
            Promise.resolve(userData != null && userData.isAdmin),
        );
  },

  isInviter: function(user: OAuthUserType): boolean {
    if (user === null) {
      return false;
    }
    return user && user.email.split('@').pop() === 'google.com';
  },

  isUser: function(user: OAuthUserType): Promise<boolean> {
    // This is a special case for an inviter. They are not supposed to be
    // stored in database.
    if (this.isInviter(user)) {
      return Promise.resolve(true);
    }
    return readUserDataFromDB(user)
        .then((userData: Array<UserType>) => userData != null);
  },

};

export default firebaseAuthenticator;
