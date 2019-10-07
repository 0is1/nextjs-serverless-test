const compat = require("next-aws-lambda");

module.exports = page => {
  // TODO: Is IP whitelist check and basicAuth possible to do here?
  const handler = (event, context, callback) => {
    // let's add some logging
    console.log("url: ", event.path);
    // render page
    return compat(page)(event, context, callback);
  };

  // and here
  return handler;
};
