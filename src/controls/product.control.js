const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const auth = require("../middelware/auth");

router.post("" ,
auth,
 async(req,res)=>{
     req.body.userId = req.login._id;
    try{
        const product = await Product.create(req.body);
        return res.status(200).send(product);
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})


module.exports=router;