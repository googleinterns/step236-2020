/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
