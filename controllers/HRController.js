const sql =require('../connection')
class HRController{
    static async index(req,res){
        res.render('HR/index',{
            user:req.session.user
        })
    }
    static async abc(req,res){
        const a=1;
        const r= await sql`select * from get_leaverequests('jjj')`;
        res.send(r)
        console.log(r)
    }



}
module.exports=HRController