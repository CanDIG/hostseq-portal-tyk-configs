# Middleware

## Deployment of Authentication System

In order to deploy the authentication system, virtual endpoints will need to be employed.

The corresponding middleware for browser login flow are `virtualLogin.js` and `virtualLogout.js`. In particular, when the user is authenticated via the browser log-in flow, an `httponly` `session_id` cookie is set, which helps authenticate the users.

The middleware for API-based token flow is `virtualToken.js`. This exposes a `/POST /auth/token` endpoint that retrieves an `id_token` when username and password are provided.

The middleware for checking the session payload is `virtualSession.js`. This exposes a `/GET /auth/sessioninfo` endpoint that returns the payload data of the JWT token issued, which includes basic metadata of the session and user of the active session.


## Deployment of API services that are not used in frontend apps

No middleware is required.

## Deployment of API services that are used in frontend apps

No middleware is required if the frontend apps can correctly include `session_id` as its Authentication header when making API requests.

This may not always be possible because by default, the `session_id` cookie is set to `httponly`. You may remove the `httponly` attribute from the `session_id` cookie, in which case, it will be available for use to JavaScript.

Otherwise, you should specify `BackendAuthMiddleware.js` as the pre-middleware. The purpose of this middleware is to correctly parse out the `session_id` cookie from the browser request headers.

## Deployment of frontend applications

You should specify `FrontendAuthMiddleware.js` as the pre-middleware. The purpose of this middleware is to return a 302 forwarding to redirect the users to complete the browser login flow, when they attempt to access the frontend apps.

As the middleware is not aware, and does not check if a particular path exists in the frontend apps, it is on individual apps to correctly handle the requests, and display meaningful 404 messages when required.





