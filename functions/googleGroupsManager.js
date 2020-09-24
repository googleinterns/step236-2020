const DIRECTORY_API_VERSION = 'directory_v1';

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

exports.createGroup = async (auth, googleService, groupEmail, groupDescription, groupName) => {
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

exports.deleteGroup = async (auth, googleService, groupEmail) => {
  const service = googleService.admin({version: DIRECTORY_API_VERSION, auth});
  return service.groups.delete({
    "groupKey": groupEmail
  }).then(
      (response) => response.result,
      (error) => error
  );
}
