const express = require("express");
const router = express.Router();
const RootController = require("../controllers/rootController");
const ifLoggedIn = require("../middleware/ifLoggedIn");
const ifNotLoggedIn = require("../middleware/ifNotLoggedIn");

router.get("/", ifLoggedIn, RootController.indexPage);
router.get("/login", ifLoggedIn, RootController.loginPage);
router.get("/signup", ifLoggedIn, RootController.signupPage);
router.get("/logout", ifNotLoggedIn, RootController.logout);




router.post('/login', ifLoggedIn, RootController.login)



router.use('/admin', require('./admin'))
router.use('/HR', require('./HR'))
router.use('/employee', require('./employee'));
router.use("/supervisor", require("./supervisor"));
module.exports = router;
