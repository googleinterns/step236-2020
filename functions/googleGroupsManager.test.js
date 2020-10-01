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

const authenticator = require('./authenticator')
const googleGroupsManager = require('./googleGroupsManager');
const CONFIG = require('./config.json');

// gMail API constants
const {google} = require('googleapis');
const DOMAIN = CONFIG.DOMAIN;
const CREDENTIALS_PATH = CONFIG.CREDENTIALS_PATH;
const DIRECTORY_API_VERSION = CONFIG.DIRECTORY_API_VERSION;

// Testing constants
const JEST_GROUP_EMAIL = `jest-test@${DOMAIN}`;
const JEST_GROUP_DESCRIPTION = 'jest test description';
const JEST_GROUP_NAME = 'jest test name';

// Internal functions for groups listing testing -- ADD and DELETE group.
createGroup = async (auth, googleService, groupEmail, groupDescription, groupName) => {
  const service = googleService.admin({version: DIRECTORY_API_VERSION, auth});
  return service.groups.insert({
    "resource": {
      "email": groupEmail,
      "name": groupName,
      "description": groupDescription
    }
  }).then(
      (response) => response.result,
      (error) => {
        console.error(`API returned with error code: ${error}`);
        return error;
      }
  );
}

deleteGroup = async (auth, googleService, groupEmail) => {
  const service = googleService.admin({version: DIRECTORY_API_VERSION, auth});
  return service.groups.delete({
    "groupKey": groupEmail
  }).then(
      (response) => response.result,
      (error) => error
  );
}

test('Listing of groups is defined', async done => {
  async function callback(auth) {
    try {
      let groupsData = await googleGroupsManager.listGroups(auth, google, DOMAIN);
      expect(groupsData).toBeDefined();
      done();
    } catch (error) {
        done(error);
    }
  }
  authenticator.checkCredentials(CREDENTIALS_PATH, callback);
});

test('Add and delete group', async done => {
  async function callback(auth) {
    try {
      // Add the group and check if it has appeared on the list of groups.
      await createGroup(auth, google, JEST_GROUP_EMAIL,
          JEST_GROUP_DESCRIPTION,
          JEST_GROUP_NAME);
      let groupsDataAfterAdd = await googleGroupsManager.listGroups(auth, google, DOMAIN);
      let searchAddedGroupResult = groupsDataAfterAdd.filter(
          (group) => (group.email === JEST_GROUP_EMAIL)
      )
      expect(searchAddedGroupResult.length).toEqual(1);
      // Delete the group and check if it has been deleted from the list of groups.
      await deleteGroup(auth, google, JEST_GROUP_EMAIL);
      let groupsDataAfterDelete = await googleGroupsManager.listGroups(auth, google, DOMAIN);
      let searchDeletedGroupResult = groupsDataAfterDelete.filter(
          (group) => (group.email === JEST_GROUP_EMAIL)
      )
      expect(searchDeletedGroupResult.length).toEqual(0);
      done();
    } catch (error) {
      done(error);
    }
  }
  authenticator.checkCredentials(CREDENTIALS_PATH, callback);
});

test('Delete non existing group', async done => {
  async function callback(auth) {
    try {
      let groupsData = await googleGroupsManager.listGroups(auth, google, DOMAIN);
      let errorCode = await deleteGroup(auth, google, JEST_GROUP_EMAIL);
      expect(errorCode.code).toEqual(404);
      expect(errorCode.errors[0].reason).toEqual('notFound');
      let groupsDataAfterDelete = await googleGroupsManager.listGroups(auth, google, DOMAIN);
      expect(groupsDataAfterDelete.length).toEqual(groupsData.length);
      done();
    } catch (error) {
      done(error);
    }
  }

  authenticator.checkCredentials(CREDENTIALS_PATH, callback);
});
