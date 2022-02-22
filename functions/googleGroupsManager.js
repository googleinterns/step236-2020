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

const CONFIG = require('./config.json');

const DIRECTORY_API_VERSION = CONFIG.DIRECTORY_API_VERSION;

/**
 function that retrieves all users from the domain's gSuite
 using Admin Directory SDK
 * @param {OAuth2.0 instance} auth
 * @param {gAPI instance} googleService
 * @param {string} domain
 * @return {Promise<any>} the found list of users or null otherwise
 */
exports.listUsers = async (auth, googleService, domain) => {
  const service = googleService.admin({version: DIRECTORY_API_VERSION, auth});
  return service.users.list({
    domain: domain,
    customer: 'my_customer',
    orderBy: 'email',
  }).then(
      (response) => response.data.users,
      (error) => {
        console.error(`API returned with error code: ${error}`);
        return null;
      }
  );
}

exports.listGroups = async (auth, googleService, domain) => {
  const service = googleService.admin({version: DIRECTORY_API_VERSION, auth});
  return service.groups.list({
    domain: domain,
    customer: 'my_customer',
    orderBy: 'email',
  }).then(
      (response) => response.data.groups,
      (error) => {
        console.error(`API returned with error code: ${error}`);
        return null;
      }
  );
}
