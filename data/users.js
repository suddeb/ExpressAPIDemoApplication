// In-memory data store — no database needed for this demo
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith",    email: "bob@example.com",   role: "user"  },
  { id: 3, name: "Carol White",  email: "carol@example.com", role: "user"  },
  { id: 4, name: "David Lee",    email: "david@example.com", role: "editor"},
];

module.exports = users;
