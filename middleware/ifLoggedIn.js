const ifLoggedIn=(req,res, next)=>{
    if(req.session.user && req.session.user.type){
        if(req.session.user.type=="admin"){
            res.redirect("/admin/home")
        }
        else if(req.session.user.type=="hr"){
            res.redirect("/hr")
        }
        else{
            req.session.user=null
            res.redirect("/login")
        }


    }
    else{
        next();
    }
}
module.exports=ifLoggedIn;