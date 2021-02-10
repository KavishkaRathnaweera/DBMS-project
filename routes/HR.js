const express=require('express')
const router=express.Router()
const HRController=require("../controllers/HRController")
const ifLoggedIn = require("../middleware/ifLoggedIn");
const ifNotLoggedIn = require("../middleware/ifNotLoggedIn");
const ifAdmin = require("../middleware/ifAdmin");
const RootController = require("../controllers/rootController");



router.get("/", HRController.loginHR);
router.get("/home", HRController.home);
router.get('/addEmployeePage', HRController.addEmployeePage);


router.post("/submitEmployee", HRController.submitEmployee);
module.exports=router