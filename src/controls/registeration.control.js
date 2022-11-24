const express = require("express");
const router = express.Router();
const Registeration = require("../models/registeration.model");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
require('dotenv').config()

router.post("" , 


body("firstName").not().isEmpty().withMessage("Please enter your first name !")
.isLength({ min : 2 , max : 15}),

body("lastName").not().isEmpty().withMessage("Please enter your last name !")
.isLength({ min : 2 , max : 15}),

body("email").not().isEmpty().withMessage("Please enter your email")
.isEmail().withMessage("Please enter valid email !")
.custom(async(value)=>{
let email = await Registeration.findOne({email : value});
if(email)
{
    throw new Error("User already exist !")
}
else{
    return true;
}
}),

body("password").not().isEmpty().withMessage("Please enter password !")
.isLength({min : 5}).withMessage("password length should be min 5 char")
.custom((value)=>{

    var pass = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if ( value.match(pass)) {
        return true;  
    }
    else{
        throw new Error("set strong password");
    }
})


,
async(req , res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let registeration = await Registeration.create(req.body);

        let token = generateToken(registeration);

        return res.status(200).send({ registeration , token ,error :false});
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
})


const generateToken = (registeration)=>{
    return jwt.sign({ registeration }, process.env.KEY);
}

module.exports = router;