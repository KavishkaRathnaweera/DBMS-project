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
router.get('/jupitorLeaves', ifNotLoggedIn, ifAdmin, adminContoller.viewLeaves)
router.get('/editLeave/:paygrade_level',ifNotLoggedIn, ifAdmin, adminContoller.editLeavePage)
router.get('/jupitorBranches', adminContoller.viewBranches);
router.get('/logout',ifNotLoggedIn, ifAdmin, RootController.logout)


router.post('/login',ifLoggedIn, adminContoller.login)
router.post('/addHR', ifNotLoggedIn, ifAdmin, adminContoller.addHR)
router.post('/addBranch',  ifNotLoggedIn, ifAdmin,adminContoller.addBranch)
router.post('/editLeave/:paygrade_level',ifNotLoggedIn, ifAdmin, adminContoller.editLeave)
router.post('/signup', ifLoggedIn, adminContoller.signup)


module.exports=router