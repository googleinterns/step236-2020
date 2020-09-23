/**
 function that retrieves all users from the domain's gSuite
 using Admin Directory SDK
 * @param {OAuth2.0 instance} auth
 * @param {gAPI instance} googleService
 * @param {string} domain
 * @return {Promise<any>} the found list of users or null otherwise
 */
exports.listUsers = async (auth, googleService, domain) => {
  const service = googleService.admin({version: 'directory_v1', auth});
  return service.users.list({
    domain: domain,
    customer: 'my_customer',
    orderBy: 'email',
  }).then(
      (response) => {
        return response.data.users;
      },
      (error) => {
        console.error(`API returned with error code: ${error}`);
        return null;
      }
  );
}
