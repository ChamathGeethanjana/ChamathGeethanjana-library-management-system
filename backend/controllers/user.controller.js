const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../startup/database");
const bodyParser = require("body-parser");
const path = require("path");

exports.signupUser = (req, res) => {
  const { email, password, name } = req.body;
  const sql = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res
        .status(500)
        .json({ error: "An error occurred during signup." });
    }
    db.query(sql, [email, hash, name], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ error: "An error occurred during signup." });
      }
      console.log("Successfully signed up user");
      res.status(201).json({ message: "user signed up successfully" });
    });
  });
};

exports.signinUser = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      console.log("not");
      return res.status(500).json({ error: "An error occurred during login." });
    }
    if (results.length === 0) {
      console.log("not");
      return res.status(401).json({ error: "Invalid email or password1." });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isPasswordValid) => {
      if (!isPasswordValid) {
        console.log("not");
        return res.status(401).json({ error: "Invalid email or password2." });
      }
      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      console.log("successfully user login");
      console.log(user);
      const data = {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      };
      res.cookie("access_token", token).status(200).json(data);
    });
  });
};

exports.signoutUser = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been signout!");
  } catch (error) {
    next(error);
  }
};

exports.getBooks = (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "An error occurred." });
    }
    res.json(results);
  });
};

exports.borrowBook = (req, res) => {
  const { book_id, user_id } = req.body;
  const sql = "UPDATE books SET availability = 0 WHERE book_id = ?";
  const sql2 =
    "INSERT INTO borrowed_books (user_id, book_id, borrow_date) VALUES (?, ?, NOW())";
  db.query(sql, [book_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json("An error occurred.");
      // console.log("An error occurred");
    }
    console.log({ message: "Book borrowed successfully." });
  });
  db.query(sql2, [user_id, book_id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "An error occurred." });
    }
    res.json({ message: "Book borrowed successfully recorded." });
  });
};

exports.returnBook = (req, res) => {
  const { book_id, user_id } = req.body;
  const sql = "UPDATE books SET availability = 1 WHERE book_id = ?";
  const sql2 = "DELETE FROM borrowed_books WHERE book_id = ? AND user_id = ?";
  db.query(sql, [book_id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "An error occurred." });
    }
    console.log({ message: "Book returned successfully." });
  });
  db.query(sql2, [book_id, user_id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "An error occurred." });
    }
    res.json({ message: "Book returned successfully recorded." });
  });
};
