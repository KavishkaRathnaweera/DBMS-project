class employeeController{
    
  static async index(req,res){
        res.render('employee/index',{ });
    }

  static async applyLeave(req,res){
        res.render('employee/applyLeave',{ });
    }


  static async attendance(req,res){
      res.render('employee/attendance',{ });
    }

    static async employeeInfo(req,res){
      res.render('employee/employeeInfo',{});
    }
    static async leavesHistory(req,res){
      res.render('employee/leavesHistory',{});
    }

    }













module.exports=employeeController;