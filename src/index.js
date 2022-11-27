const express = require("express");
const app = express();
app.use(express.json());
const connect =require("./configs/db")
require('dotenv').config()
const cors = require("cors");
app.use(cors());

const registerationControl = require("./controls/registeration.control");
app.use("/registeration" , registerationControl);

const loginControl = require("./controls/login.control");
app.use("/login" , loginControl)

const productControl = require("./controls/product.control");
app.use("/products" , productControl)

app.use("/", (req, res) => {
    res.send(
      `<h1 style="color:#C7AA8D;font-size:46px;margin:20px auto;">Welcome to FullStack Todo-App API</h1>`
    );
  });
app.listen(process.env.PORT ,async()=>{
    try{
        await connect();
        console.log(`running on ${process.env.PORT}`)
    }
    catch(err)
    {
        console.log(err.message);
    }

})