const express = require("express");
const router = express.Router();
const Registeration = require("../models/registeration.model");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
require('dotenv').config()


router.post("" ,

body("email").not().isEmpty().withMessage("Please enter email")
.custom(async(value)=>{
    let email = await Registeration.findOne({email : value});
    if(!email)
    {
        throw new Error("User does not exist !")
    }
    else{
        return true;
    }
}),

async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

        const login = await Registeration.findOne({ email : req.body.email});
        if(! login)
        {
            return res.status(400).send("User does not exist !")
        }
        else
        {
            const match = login.checkPassword(req.body.password);
            if(!match)
            {
                return res.status(400).send("wrong password")
            }
            if(match)
            {
                let token = generateToken(login);

                return res.status(200).send({ login , token , error : false})
            }
        }
    }

    catch(err)
    {
        return res.status(500).send(err.message);
    }
})

const generateToken = (login)=>{
    return jwt.sign({ login }, process.env.KEY);
}

module.exports=router;
