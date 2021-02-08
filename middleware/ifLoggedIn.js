const ifLoggedIn=(req,res, next)=>{
    if(req.session.user && req.session.user.type){
        if(req.session.user.type=="admin"){
            res.redirect("/admin/home")
        }
        else if(req.session.user.type=="HR"){
            res.redirect("/HR/home")
        }
        else if(req.session.user.type=="employee"){
            res.redirect("/employee")
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