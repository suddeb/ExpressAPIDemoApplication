const express = require("express");
const router = express.Router();
const users = require("../data/users");

// ─── GET /api/users ──────────────────────────────────────────────
// Returns all users. Supports optional ?role= filter.
// Example: GET /api/users?role=admin
router.get("/", (req, res) => {
  const { role } = req.query;

  const result = role
    ? users.filter((u) => u.role === role)
    : users;

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

// ─── GET /api/users/:id ──────────────────────────────────────────
// Returns a single user by ID.
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    const err = new Error(`User with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  res.json({ success: true, data: user });
});

// ─── POST /api/users ─────────────────────────────────────────────
// Creates a new user. Body must include name, email, role.
router.post("/", (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    const err = new Error("name, email, and role are required");
    err.status = 400;
    return next(err);
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    role,
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// ─── PUT /api/users/:id ──────────────────────────────────────────
// Updates an existing user.
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    const err = new Error(`User with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  users[index] = { ...users[index], ...req.body, id };
  res.json({ success: true, data: users[index] });
});

// ─── DELETE /api/users/:id ───────────────────────────────────────
// Deletes a user by ID.
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    const err = new Error(`User with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  const deleted = users.splice(index, 1)[0];
  res.json({ success: true, data: deleted, message: "User deleted successfully" });
});

module.exports = router;
