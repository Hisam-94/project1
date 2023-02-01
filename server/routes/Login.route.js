const { UserModel } = require("../models/User.model")
const {Router} = require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config()

const LoginRoute = Router()

LoginRoute.post("/", async(req,res)=>{
    const {email,password} = req.body
    const user = await UserModel.findOne({email:email})
    if(user)
    {
        const hash = user.password
        bcrypt.compare(password, hash, function(err, result) {
            if(err)
            {
                console.log(err)
                res.send({msg:"Something went wrong"})
            }
            if(result)
            {
                jwt.sign({ email: email }, process.env.KEY, function(err, token) {
                    if(err)
                    {
                        res.send({msg:"Somethong went wrong"})
                    }else{
                        res.send({msg:"Login Successfull",token:token})
                    }
                  });
            }else{
                res.send({msg:"Login failed, Invalid credentials"})
            }
        });

    }else{
        res.send({msg:"Login failed, Invalid credentials"})
    }
})

module.exports = {
    LoginRoute
}