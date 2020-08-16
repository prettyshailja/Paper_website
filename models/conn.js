const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost/mean89")
const dbo=mongoose.connection
console.log("connection done!!!")
module.exports=dbo

