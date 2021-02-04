const express=require('express')
const router=express.Router()
const adminContoller=require("../controllers/adminController")
const ifLoggedIn=require("../middleware/ifLoggedIn")
const ifNotLoggedIn=require("../middleware/ifNotLoggedIn")
const ifAdmin=require("../middleware/ifAdmin")
const RootController = require('../controllers/rootController')


router.get('/login', ifLoggedIn, adminContoller.loginPage)
router.get('/home', ifNotLoggedIn, ifAdmin, adminContoller.home)
router.get('/signup', ifLoggedIn,adminContoller.signupPage)
router.get('/addHR',ifNotLoggedIn, ifAdmin, adminContoller.addHRPage)
router.get('/logout',ifNotLoggedIn, ifAdmin, RootController.logout)


router.post('/login',ifLoggedIn, adminContoller.login)
router.post('/addHR', ifNotLoggedIn, ifAdmin, adminContoller.addHR)
router.post('/signup', ifLoggedIn, adminContoller.signup)


module.exports=router