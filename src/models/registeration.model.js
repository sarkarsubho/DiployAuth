const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const registerationSchema = new mongoose.Schema({
    firstName : { type : String , required : true},
    lastName : { type : String , required : true},
    email : { type : String , required : true , unique : true},
    password : { type : String , required : true}
    
},
{
    versionKey : false,
    timestamps:true
})

registerationSchema.pre("save" , function(){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
})

registerationSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password);
}

const Registeration = mongoose.model("registeration" , registerationSchema );

module.exports = Registeration;
