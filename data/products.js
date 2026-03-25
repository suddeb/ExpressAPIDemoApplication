// In-memory data store — no database needed for this demo
const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99,  stock: 120 },
  { id: 2, name: "Mechanical Keyboard",  category: "Electronics", price: 129.99, stock: 45  },
  { id: 3, name: "Standing Desk",        category: "Furniture",   price: 349.99, stock: 18  },
  { id: 4, name: "Ergonomic Chair",      category: "Furniture",   price: 249.99, stock: 30  },
  { id: 5, name: "USB-C Hub",            category: "Electronics", price: 39.99,  stock: 200 },
];

module.exports = products;
