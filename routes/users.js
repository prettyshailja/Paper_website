var express = require('express');
var path = require('path');
var usersmodel = require('../models/usersmodel.js');
var router = express.Router();

/* GET users listing. */
router.all('/upload', function(req, res, next) {
  if(req.method=="GET")
  {
    res.render('upload',{'o':''});
  }
  else
  {
    if(!req.files)
        res.status(400).send("file not uploaded")
    else
    {
        var myfile=req.files.myfile
       var newnm=myfile.name
        moment=req.timestamp
        
        var newfnm=moment.tz("Asia/Kolkata").format()+"-"+newnm
         
        var file_path=path.join(__dirname,"../public/uploads",newfnm)
        myfile.mv(file_path,function(err){
            if(err)
                console.log(err)
            else    
            {
                usersmodel.uploadfile(newfnm,function(result){
               res.render('upload',{'o':result})  
             })
            }        
        })
        
    }    
  }    
});

router.get("/viewupload",function(req,res,next){
   var tbl_nm="upload"
   usersmodel.selectall(tbl_nm,function(result){
            res.render("viewupload",{'data':result})
    })
   
});

module.exports = router;
