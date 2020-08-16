const dbo=require("./conn.js")

function insert(data,cb)
{
    
    dbo.collection("expressdata").insert(data,function(err,result){
            if(err)
            console.log(err)
        var o
        if(result)
            o="record inserted"
        else
            o="record not inserted"
        cb(o) 
    })
  }

function selectall(c_name,cb)
{
    dbo.collection(c_name).find().toArray(function(err,result){
        cb(result)
    })
}


function deleteone(c_name,where_con,cb)
{
    dbo.collection(c_name).remove(where_con,function(err,result){
            if(err)
                console.log(err)    
            cb(result)
    })
}
/*
function updateone(tbl_name,where_con,cb)
{
    var query="select * from "+tbl_name+" where rno="+where_con.rno
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        cb(result)    
    })    
}

function updaterecord(data,cb)
{
    var query="update data set name='"+data.nm+"',phy="+data.phy+",che="+data.che+",mat="+data.mat+" where rno="+data.rno    
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        cb(result)    
    }) 
    
}

function logincheck(data,cb)
{
    var query="select * from login where username='"+data.unm+"' && password='"+data.pass+"'"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)    
    })
    
    
}

function uploadfile(fnm,cb)
{
      query="insert into upload values('"+fnm+"')"
    con.query(query,function(err,result){
        if(err)
            console.log(err)
        var o
        if(result)
            o="file uploaded"
        else
            o="file not uploaded"
        cb(o)          
    })
  
}*/

//module.exports={insert:insert,selectall:selectall,deleteone:deleteone,updateone:updateone,updaterecord:updaterecord,logincheck:logincheck,uploadfile:uploadfile}
module.exports={insert:insert,selectall:selectall,deleteone:deleteone}
