# Rate Limiting Implementation Plan

## Objective
Implement a rate-limiting solution for the Express.js API to protect against abuse and ensure service availability. The rate limiter will be applied specifically to API routes (`/api/users` and `/api/products`) with a standard limit of 100 requests per 15 minutes, leaving the static Web UI and health check unrestricted.

## Key Files & Context
- `package.json`: Will be updated with the new `express-rate-limit` dependency.
- `app.js`: Will be updated to configure and apply the rate-limiting middleware.

## Implementation Steps

### 1. Install Dependencies
- Run `npm install express-rate-limit` to add the rate-limiting package to the project.

### 2. Configure Rate Limiter (`app.js`)
- Import `express-rate-limit` at the top of the file.
- Create an `apiLimiter` instance configured with:
  - `windowMs`: 15 * 60 * 1000 (15 minutes).
  - `max`: 100 (limit each IP to 100 requests per `windowMs`).
  - `standardHeaders`: true (Return rate limit info in the `RateLimit-*` headers).
  - `legacyHeaders`: false (Disable the `X-RateLimit-*` headers).
  - `message`: A customized JSON response indicating the rate limit has been exceeded (e.g., `{ success: false, error: 'Too many requests, please try again later.' }`).

### 3. Apply Middleware (`app.js`)
- Apply the `apiLimiter` middleware specifically to the API routes, ensuring the static UI (`/`) and health check (`/api/health`) remain unrestricted.
  - Apply to `app.use("/api/users", apiLimiter, usersRouter);`
  - Apply to `app.use("/api/products", apiLimiter, productsRouter);`

## Verification & Testing
1. Start the server using `npm start`.
2. Ensure the static UI at `http://localhost:3000/` and the health check at `http://localhost:3000/api/health` load correctly without rate-limit headers.
3. Execute an API request (e.g., `GET /api/users`) and verify the presence of `RateLimit-*` headers in the response.
4. Execute more than 100 requests to an API route (using a script or rapid clicking in the UI) and confirm that a `429 Too Many Requests` status code and the configured error message are returned.