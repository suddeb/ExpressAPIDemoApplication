# express-api-demo

A clean, minimal Express.js REST API — built as a demo project for the **Technical Potpourri** YouTube series on [Gemini CLI Plan Mode](https://sudipta-deb.in).

No database required. All data lives in-memory so you can clone and run it instantly.

---

## 🚀 Youtube Video

Youtube Video: Gemini CLI's New Plan Mode Changes Everything for Developers
Link: https://youtu.be/q-Qon0I7MS8

---

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/express-api-demo.git
cd express-api-demo
npm install
npm run dev       # development (nodemon)
# or
npm start         # production
```

Server starts at **http://localhost:3000**

---

## 📦 Project Structure

```
express-api-demo/
├── app.js                  ← Entry point, middleware & route registration
├── routes/
│   ├── users.js            ← CRUD routes for /api/users
│   └── products.js         ← CRUD routes for /api/products
├── data/
│   ├── users.js            ← In-memory users array
│   └── products.js         ← In-memory products array
├── middleware/
│   ├── logger.js           ← Request logger
│   └── errorHandler.js     ← Central error handler
├── package.json
└── .gitignore
```

---

## 🔌 API Endpoints

### Health Check

| Method | Path | Description         |
|--------|------|---------------------|
| GET    | `/`  | Server health check |

### Users — `/api/users`

| Method | Path             | Description               |
|--------|------------------|---------------------------|
| GET    | `/api/users`     | List all users            |
| GET    | `/api/users?role=admin` | Filter users by role |
| GET    | `/api/users/:id` | Get a single user         |
| POST   | `/api/users`     | Create a new user         |
| PUT    | `/api/users/:id` | Update an existing user   |
| DELETE | `/api/users/:id` | Delete a user             |

### Products — `/api/products`

| Method | Path                              | Description                   |
|--------|-----------------------------------|-------------------------------|
| GET    | `/api/products`                   | List all products             |
| GET    | `/api/products?category=Electronics` | Filter by category         |
| GET    | `/api/products/:id`               | Get a single product          |
| POST   | `/api/products`                   | Create a new product          |
| PUT    | `/api/products/:id`               | Update an existing product    |
| DELETE | `/api/products/:id`               | Delete a product              |

---

## 🧪 Example Requests

```bash
# Get all users
curl http://localhost:3000/api/users

# Get a single user
curl http://localhost:3000/api/users/1

# Filter by role
curl http://localhost:3000/api/users?role=admin

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Eve Taylor","email":"eve@example.com","role":"user"}'

# Update a user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"role":"superadmin"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/2

# Get all products (Electronics only)
curl http://localhost:3000/api/products?category=Electronics
```

---

## 🎬 Used In

This repo is the demo project for the **Technical Potpourri** video:
**"Gemini CLI Plan Mode — Think Before You Build"**
Link: https://youtu.be/q-Qon0I7MS8

👉 Watch it at [sudipta-deb.in](https://sudipta-deb.in) or on the [Technical Potpourri YouTube channel](https://www.youtube.com/@TechnicalPotpourri).

The video demonstrates how to use **Gemini CLI Plan Mode** to add rate limiting to this API — without the agent touching a single file until a full plan is reviewed and approved.

---

## 📄 License

MIT
# ExpressAPIDemoApplication
