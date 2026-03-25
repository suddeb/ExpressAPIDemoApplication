# Web UI Implementation Plan

## Objective
Implement a web-based UI that allows users to select API endpoints, execute requests, and view the formatted JSON response. The UI will be hosted at the root (`/`), replacing the current JSON health check (which will be moved to `/api/health`). The UI will be built using separated HTML, CSS, and JavaScript files.

## Key Files & Context
- `app.js`
- `public/index.html` (New)
- `public/style.css` (New)
- `public/script.js` (New)

## Implementation Steps

### 1. Update Server Configuration (`app.js`)
- Add `app.use(express.static('public'))` middleware.
- Change `app.get('/')` to `app.get('/api/health')`.

### 2. Create the UI Layout (`public/index.html`)
- HTML boilerplate linking to `style.css` and `script.js`.
- Dropdown for HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
- Input for API endpoints.
- `<textarea>` for JSON request body.
- "Send Request" button.
- `<pre><code>` block to display response.

### 3. Add Styling (`public/style.css`)
- Basic, clean UI styling.
- Distinct background for the response `<pre>` tag.

### 4. Implement Client-Side Logic (`public/script.js`)
- Event listener for form submission.
- `fetch` API call based on inputs.
- Parse and display JSON response.

## Verification
1. Start the server.
2. Open `http://localhost:3000/`.
3. Test `GET /api/users`.
4. Test `POST /api/products`.
