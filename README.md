## next.js serverless test

NOTE: `serverless-nextjs-plugin` doesn't support `"next": "9",`

To test locally:

```
* yarn
* npx serveless offline
```

This test repo is created to figure out if it's possible to have the following setup with serveless + next.js:

- IP whitelist authorizing
- Fallback to Basic Auth if IP doesn't match to whitelist
  - Basic Auth should be configured to root url
