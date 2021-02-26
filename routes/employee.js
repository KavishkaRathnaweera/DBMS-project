const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.index);

router.use("/applyLeave", employeeController.applyLeave);
router.use("/employeeInfo", employeeController.employeeInfo);
router.use("/leaveRecords", employeeController.leaveRecords);
router.post("/requestLeave", employeeController.requestLeave);

module.exports = router;
