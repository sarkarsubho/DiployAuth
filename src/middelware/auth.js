
var jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken=(token)=>{
    return new Promise((resolve , reject)=>{
        var decoded = jwt.verify(token, process.env.KEY, (err, decoded)=> {
            if(err) return reject(err)

            return resolve(decoded);
          });
    })
}

const auth = async(req,res,next)=>{
    if(!req.headers.authorization) 
    return res.status(400).send("authorization token not found");

    if(!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send("wrong token")

    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    try{
         decoded = await verifyToken(token)
    }
    catch(err)
    {
        return res.status(500).send("wrong token found")
    }
    req.login = decoded.login
    console.log(decoded);
    next();
}



module.exports=auth;