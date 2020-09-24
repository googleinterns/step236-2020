const authenticator = require('./authenticator')
const googleGroupsManager = require('./googleGroupsManager');

// gMail API constants.
const {google} = require('googleapis');
const DOMAIN = 'identity-sre.com';
const CREDENTIALS_PATH = 'credentials.json';

// Testing constants
const JEST_GROUP_EMAIL = 'jest-test@identity-sre.com';
const JEST_GROUP_DESCRIPTION = 'jest test description';
const JEST_GROUP_NAME = 'jest test name';

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
      // Add the group and check if it has appeared in gSuite.
      await googleGroupsManager.createGroup(auth, google, JEST_GROUP_EMAIL,
          JEST_GROUP_DESCRIPTION,
          JEST_GROUP_NAME);
      let groupsDataAfterAdd = await googleGroupsManager.listGroups(auth, google, DOMAIN);
      let searchAddedGroupResult = groupsDataAfterAdd.filter(
          (group) => (group.email === JEST_GROUP_EMAIL)
      )
      expect(searchAddedGroupResult.length).toEqual(1);
      // Delete the group and check if it has been deleted properly.
      await googleGroupsManager.deleteGroup(auth, google, JEST_GROUP_EMAIL);
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
      let errorCode = await googleGroupsManager.deleteGroup(auth, google, JEST_GROUP_EMAIL);
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
