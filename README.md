# Client Authenticator | Mock

A simple mock authenticator client, written in JavaScript.

<br />

## Table of Contents

* [Introduction][section-introduction]
* [How to Use][section-how-to-use]
* [API][section-api]
* [For Developers][section-for-developers]


## Introduction

The `authenticator-client-mock-js` is a simple client service, that mimics the common behaviors of HTTP-based authentication schemes. It does not transmit data over HTTP; it can be merely used for supporting offline/detached testing and development scenarios.

The implementation is designed to be compatible with the `vuestrap-client-auth-support` Authenticator interface.

## How to Use

### Install

``` sh
$ yarn add authenticator-client-mock-js
```

### Compatible with the Client Auth Support Vuestrap

For example:
``` javascript
import Vue from 'vue';
import store from './store'; // your vuex store instance
import router from './router'; // your vue-router instance
import MockAuthenticator from 'authenticator-client-mock-js';
import ClientAuthSupport from 'vuestrap-client-auth-support';

const MockAuth = new MockAuthenticator({ ttl: 5 * 60 * 1000 }); // expire session in 5 mins

Vue.use(ClientAuthSupport, {
  store,
  router,
  authenticator: MockAuth,
  persistType: 'local',
  tokenName: 'user-auth-token',
});
```


## API

### Constructor

#### _Constructor Options_

| Name             | Required? | Description |
| ---------------- | --------- | ----------- |
| debug            | No        | Set to `true` to log debug messages during utilization. Defaults to `false`. |
| ttl              | No        | Defaults to `0` (expires immediately). |

### Instance

#### _Instance Properties_

| Name        | Type    | Description |
| ----------- | ------- | ----------- |
| ttl         | Number  | The configured `ttl` before the generated token expires. (`0` = expires immediately, `-1` = never expires, `<millis>` = any positive integer) |
| state       | Object  | The mock state that is mutated for simulation purposes. |


#### _Instance Functions_

> All functions return Promises (except `resetState`).

| Name         | Parameters | Returns | Description |
| ------------ | ---------- | ------- | ----------- |
| authenticateUser | creds = `{ username: <username>, password: <password> }` | `{ token: '<the_token>', expires_at: <timestamp_in_seconds> }` | Performs a mock authentication request, that always succeeds if a `username` is provided. When authentication is granted, the service returns a user auth token, with an expiration timestamp per the configured `ttl`. |
| expireUser | token = `'<the_token>'` | `{ success: true }` | |
| fetchUserInfo | token = `'<the_token>'` |  | |
| resetState | (none) | (void) | Resets the instance `state` to the default values. |


### Errors

[TBC]


## For Developers

### Dev Lint

The plugin uses [ESLint][link-eslint-site] for source code linting. The linting will run automatically on `git commit`.

``` sh
$ yarn lint
```


### Dev Test

The plugin uses [Mocha][link-mocha-site] for the testing framework,
and [Chai][link-chai-site] for its assertions.

``` sh
$ yarn test
```

### Dev Build

The plugin is automatically built on `yarn publish`. But, you can manually build the plugin using:

``` sh
$ yarn build-plugin
```

[section-introduction]: #introduction
[section-how-to-use]: #how-to-use
[section-api]: #api
[section-for-developers]: #for-developers

[link-eslint-site]: https://eslint.org
[link-mocha-site]: https://mochajs.org
[link-chai-site]: http://chaijs.com
