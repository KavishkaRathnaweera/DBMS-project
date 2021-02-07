const { request } = require("express");
const express = require("express");
const router = express.Router();
const RootController = require("../controllers/rootController");
const { supervisor } = require("../controllers/supervisorController");
const ifLoggedIn = require("../middleware/ifLoggedIn");
const ifNotLoggedIn = require("../middleware/ifNotLoggedIn");
const admin = require("../models/admin");


// get requests
router.get("/", ifLoggedIn, RootController.indexPage);
router.get("/login", ifLoggedIn, RootController.loginPage);
router.get("/signup", ifLoggedIn, RootController.signupPage);
router.get("/logout", ifNotLoggedIn, RootController.logout);



// post requests
router.post('/login', ifLoggedIn, RootController.login)
router.post('/signup', ifLoggedIn, RootController.signup)


// include admin.js, HR.js, employee.js, supervisor.js
router.use('/admin', require('./admin'))
router.use('/HR', require('./HR'))




router.use('/employee', require('./employee'));
router.use("/supervisor", require("./supervisor"));



module.exports = router;
