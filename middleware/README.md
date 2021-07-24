# Middleware

## Deployment of Authentication System

In order to deploy the authentication system, virtual endpoints will need to be employed.

The corresponding middleware for browser login flow are `virtualLogin.js` and `virtualLogout.js`.

The middleware for API-based token flow is `virtualToken.js`. This exposes a `/POST /auth/token` endpoint that retrieves an `id_token` when username and password are provided.

The middleware for checking the session payload is `virtualSession.js`. This exposes a `/GET /auth/sessioninfo` endpoint that returns the payload data of the JWT token issued, which includes basic metadata of the session and user of the active session.


## Deployment of API services that are not used in frontend apps

No middleware is required.

## Deployment of API services that are used in frontend apps

You should specify `BackendAuthMiddleware.js` as the pre-middleware. The purpose of this middleware is to correctly parse out the `session_id` cookie from the browser requests.

This middleware can be omitted if the frontend apps correctly include the `session_id` as the `Authentication` header when making API requests, this may not be possible, if the `session_id` cookie is set to `HttpOnly`, which would make it unavailble to client-side JavaScript.

## Deployment of frontend applications

You should specify `FrontendAuthMiddleware.js` as the pre-middleware. The purpose of this middleware is to return a 302 forwarding to redirect the users to complete the browser login flow, when they attempt to access the frontend apps.

As the middleware is not aware, and does not check if a particular path exists in the frontend apps, it is on individual apps to correctly handle the requests, and display meaningful 404 messages when required.





