const express = require("express");
const router = express.Router();
const { index, about, computer, laptop, product, contact, login, register, forum, logout, thanksNewsletter } = require("../controllers/PageController");
const { get, buy } = require("../controllers/Stripe");
const newContact = require("../controllers/Contact");
const auth = require("../controllers/Auth");
const authorization = require("../middlewares/checkToken");
const newNewsletter = require("../controllers/Newsletter");

// Router para las vistas

router.get("/", index);
router.get("/about", about);
router.get("/computer", computer);
router.get("/laptop", laptop);
router.get("/product", product);
router.get("/contact", contact);
router.get("/login", login);
router.get("/register", register);
router.get("/buy", get);
router.get("/forum", authorization, forum);
router.get("/logout", logout);
router.get("/newsletter", thanksNewsletter);


// Router para los metodos del controler

router.post("/payment", buy);
router.post("/contact", newContact);
router.post("/register", auth.signUp);
router.post("/login", auth.signIn);
router.post("/newsletter", newNewsletter);


module.exports = router;