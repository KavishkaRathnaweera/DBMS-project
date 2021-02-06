const express = require("express");
const router = express.Router();
const RootController = require("../controllers/rootController");
const ifLoggedIn = require("../middleware/ifLoggedIn");
const ifNotLoggedIn = require("../middleware/ifNotLoggedIn");

router.get("/", ifLoggedIn, RootController.indexPage);
router.get("/login", ifLoggedIn, RootController.loginPage);
router.get("/signup", ifLoggedIn, RootController.signupPage);
router.get("/logout", ifNotLoggedIn, RootController.logout);

router.use("/admin", require("./admin"));

router.use("/supervisor", require("./supervisor"));
router.use('/manager', require('./manager'));
module.exports = router;
