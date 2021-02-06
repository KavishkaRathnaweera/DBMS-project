const express=require('express')
const router=express.Router()
const HRController=require("../controllers/HRController")



router.get('/', HRController.index);

module.exports=router