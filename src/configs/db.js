const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://parikshitpatil:Parikshit123@cluster0.99m8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
}

module.exports=connect;