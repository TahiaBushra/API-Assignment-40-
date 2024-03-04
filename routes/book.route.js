const express = require("express");
const {
  createBook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
} = require("../controllers/book.controller");

const isAuthenticated = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:bookid", getABook);
router.put("/:bookid", updateABook); //user
router.delete("/:bookid", deleteABook); //user
router.post("/", isAuthenticated, createBook); //user

module.exports = router;
