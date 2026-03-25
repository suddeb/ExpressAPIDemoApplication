const express = require("express");
const router = express.Router();
const products = require("../data/products");

// ─── GET /api/products ───────────────────────────────────────────
// Returns all products. Supports optional ?category= filter.
// Example: GET /api/products?category=Electronics
router.get("/", (req, res) => {
  const { category } = req.query;

  const result = category
    ? products.filter((p) => p.category === category)
    : products;

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

// ─── GET /api/products/:id ───────────────────────────────────────
// Returns a single product by ID.
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    const err = new Error(`Product with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  res.json({ success: true, data: product });
});

// ─── POST /api/products ──────────────────────────────────────────
// Creates a new product. Body must include name, category, price, stock.
router.post("/", (req, res, next) => {
  const { name, category, price, stock } = req.body;

  if (!name || !category || price === undefined || stock === undefined) {
    const err = new Error("name, category, price, and stock are required");
    err.status = 400;
    return next(err);
  }

  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price: parseFloat(price),
    stock: parseInt(stock, 10),
  };

  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

// ─── PUT /api/products/:id ───────────────────────────────────────
// Updates an existing product.
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    const err = new Error(`Product with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  products[index] = { ...products[index], ...req.body, id };
  res.json({ success: true, data: products[index] });
});

// ─── DELETE /api/products/:id ────────────────────────────────────
// Deletes a product by ID.
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    const err = new Error(`Product with id ${id} not found`);
    err.status = 404;
    return next(err);
  }

  const deleted = products.splice(index, 1)[0];
  res.json({ success: true, data: deleted, message: "Product deleted successfully" });
});

module.exports = router;
