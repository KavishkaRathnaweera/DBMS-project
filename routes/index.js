const { request } = require("express");
const express = require("express");
const HRController = require("../controllers/HRController");
const router = express.Router();
const RootController = require("../controllers/rootController");
const { supervisor } = require("../controllers/supervisorController");
const ifLoggedIn = require("../middleware/ifLoggedIn");
const ifNotLoggedIn = require("../middleware/ifNotLoggedIn");
const admin = require("../models/admin");


// get requests
router.get("/", RootController.indexPage);
router.get("/employeelogin", RootController.employeeloginPage);
router.get("/login", RootController.loginPage);
router.get("/signup", RootController.signupPage);
router.get("/logout",  RootController.logout);
router.get("/abc", HRController.abc)



// post requests
router.post('/employeelogin', RootController.employeelogin)
router.post('/login', RootController.login)
router.post('/signup', RootController.signup)


// include admin.js, HR.js, employee.js, supervisor.js
router.use('/admin', require('./admin'))
router.use('/HR', require('./HR'))
router.use('/employee', require('./employee'));
router.use("/supervisor", require("./supervisor"));
router.use('/manager', require('./manager'));




module.exports = router;
