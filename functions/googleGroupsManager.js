// Exemplary function communicating with gSuite for identity-sre.com,
// listing all users.
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
      }
  );
}
