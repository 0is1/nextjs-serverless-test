const basicAuth = require("basic-auth");

const { STAGE } = process.env;

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

const authorizeUser = async (event, name, pass) => {
  // Skip auth for local development
  if (STAGE === "local") {
    return generatePolicy(name, "Allow", event.methodArn);
  }
  if (!event.authorizationToken) {
    throw new Error("Unauthorized");
  }
  // Parse Token.
  const auth = basicAuth.parse(event.authorizationToken);
  if (!auth || !auth.name || !auth.pass) {
    throw new Error("Unauthorized");
  }
  // Check token validity.
  if (auth.name === name && auth.pass === pass) {
    return generatePolicy(name, "Allow", event.methodArn);
  }
  // return generatePolicy('APP_USER', 'Deny', event.methodArn);
  throw new Error("Unauthorized");
};

module.exports.user = (event, context, cb) => {
  authorizeUser(event, "user", "password")
    .then(result => {
      cb(null, result);
    })
    .catch(err => {
      cb(err);
    });
};
