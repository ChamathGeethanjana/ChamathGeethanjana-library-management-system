const express = require("express");
const db = require("../startup/database");
const userCon = require("../controllers/user.controller");
const bodyParser = require("body-parser");

const path = require("path");

const router = express.Router();

router.post("/signup", userCon.signupUser);

router.post("/signin", userCon.signinUser);

router.get("/signout", userCon.signoutUser);

router.get("/get-books", userCon.getBooks);

router.post("/borrow-book", userCon.borrowBook);

router.post("/return-book", userCon.returnBook);

module.exports = router;
