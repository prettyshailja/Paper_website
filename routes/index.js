var express = require('express');
var url = require('url');
var usersmodel = require('../models/usersmodel.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/home",function(req,res){
    res.render("index")
})
router.get("/about",function(req,res){
    res.render("about")
})
router.get("/service",function(req,res){
    res.render("service")
})

router.get('/mycookie', function(req, res, next) {
  username="admin"
  pass="admin"
  res.cookie("unm",username)
  res.cookie("pass",pass)
  console.log("cookie stored...")
  res.clearCookie("pass")
  var data={o:"cookie stored",unm:req.cookies.unm,pass:req.cookies.pass}
  res.render('mycookie',{data:data});
});

router.all("/login",function(req,res){
    if(req.method=="POST")
    {
        var data=req.body

        if(data.chk!=undefined)
        {
            res.cookie('unm',data.unm)
            res.cookie('pass',data.pass)
        }

        usersmodel.logincheck(data,function(result){
        if(result.length>0)
        {
            req.session.unm=data.unm
            res.redirect("/success")
        
        }else    
            res.redirect("/login")
            
        })
    }
    else
    {
        var data={unm:"",pass:""}

        if(req.cookies.unm!=undefined)
            var data={unm:req.cookies.unm,pass:req.cookies.pass}                
        res.render("login",{data:data})
    }
})

router.get("/success",function(req,res){
    if(req.session.unm!=undefined)
        res.render("success",{data:req.session.unm})
    else
        res.redirect("/login")    
})

router.get("/logout",function(req,res){
    req.session.destroy()
    res.redirect("/login")
})


router.all("/register",function(req,res){
        var output=""
        if(req.method=="GET")
            res.render("register",{output:output})
        else
        {
            var data=req.body
            usersmodel.insert(data,function(output){
                res.render("register",{output:output})
            })
        }    
})

router.get("/viewall",function(req,res){
    var c_name="expressdata"
    usersmodel.selectall(c_name,function(output){
        res.render("viewall",{data:output})
    })
})

router.get("/delete",function(req,res){
    var c_name="expressdata"
    var where_con=url.parse(req.url,true).query
    usersmodel.deleteone(c_name,where_con,function(output){
        if(output)
            res.redirect("viewall")
        else
            console.log("not deleted")    
    })
})

router.get("/update",function(req,res){
    var tbl_name="data"
    var where_con=url.parse(req.url,true).query
    usersmodel.updateone(tbl_name,where_con,function(output){
        if(output)
            res.render("editdata",{data:output})
        else
            console.log("Record not found")    
    })
})

router.post("/editdata",function(req,res){
    var tbl_name="data"
    var data=req.body
            usersmodel.updaterecord(data,function(output){
                if(output)
                    res.redirect("/viewall")
            }) 
})

router.get("/contact",function(req,res){
    res.render("contact")
})


module.exports = router;
