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

const functions = require('firebase-functions');
const authenticator = require('./authenticator');
const CONFIG = require('./config.json');

// Modules used for communications with Google APIs
const gmailEmailSender = require('./gmailEmailSender');
const googleGroupsManager = require('./googleGroupsManager');

// gMail API constants.
const {google} = require('googleapis');
const DOMAIN = CONFIG.DOMAIN;
const CREDENTIALS_PATH = CONFIG.CREDENTIALS_PATH;

// TODO: Change https request listener to firestore listener.
exports.sendMail = functions.https.onRequest((request, response) => {
  const recipient = request.query.recipient;
  return authenticator.checkCredentials(CREDENTIALS_PATH,
      (auth) => {
        response.json(gmailEmailSender.sendMessage(auth, recipient, google));
      });
});

/**
 * Cloud function for retrieving all users in gSuite of DOMAIN
 * @type {HttpsFunction} (request, response) used for communication with end-user
 * @return {JSON} found list of users
 */
exports.listUsers = functions.https.onRequest((request, response) => {
  return authenticator.checkCredentials(CREDENTIALS_PATH,
      (auth) => {
        googleGroupsManager.listUsers(auth, google, DOMAIN)
            .then((output) => {
              response.json(output);
              return output;
            })
            .catch((error) => {
              response.status(403);
              response.json(error);
              return error;
        });
      },
  );
});

/**
 * Cloud function for retrieving all groups in gSuite of DOMAIN
 * @type {HttpsFunction} (request, response) used for communication with end-user
 * @return {JSON} found list of groups
 */
exports.listGroups = functions.https.onRequest((request, response) => {
  return authenticator.checkCredentials(CREDENTIALS_PATH,
      (auth) => {
        googleGroupsManager.listGroups(auth, google, DOMAIN)
            .then((output) => {
              response.json(output);
              return output;
            })
            .catch((error) => {
              response.status(403);
              response.json(error);
              return error;
            });
      },
  );
});
