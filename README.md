## next.js serverless test

Created with `npx create-next-app`

NOTE: `serverless-nextjs-plugin` doesn't support `"next": "9",`

To test locally (note that resources doesn't work with serverless offline):

```
* yarn
* npx serveless offline
```

This test repo is created to figure out if it's possible to have the following setup with serverless + next.js (https://github.com/danielcondemarin/serverless-next.js/tree/master/packages/serverless-nextjs-plugin):

- IP whitelist authorizing
- Fallback to Basic Auth if IP doesn't match to whitelist
  - Basic Auth should be configured to root url
- https://github.com/serverless/serverless/issues/6795

### How to fallback to Basic Auth if IP whitelist doesn't match?

- No idea...

### How to add Basic Auth to root url?

It seems that this is not working if `serverless-nextjs-plugin` is used

```
functions:
   handler:
     handler: handler
     events:
       - http:
           path: /
           method: GET
           authorizer: ${self:custom.authorizer.users}
```

- So best guess this far is to add `AWS::Serverless::Api` configuration with `Auth`. But this AWSCloudFormation config causes the following error:

> Error: The CloudFormation template is invalid: Template format error: Unrecognized resource types: [AWS::Serverless::Api]

```
ExplicitApi:
  Type: AWS::Serverless::Api
  Properties:
    StageName: dev
    Cors: true
    Auth:
      DefaultAuthorizer: basicAuth
      Authorizers:
        basicAuth:
          FunctionPayloadType: TOKEN
          FunctionArn:
            - Ref: Authorizer
          Identity:
            Headers:
              - Authorization
```
