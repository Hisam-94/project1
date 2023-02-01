const express = require("express")
const { connection } = require("./config/db")
const { LoginRoute } = require("./routes/Login.route")
const { SignUpRouter } = require("./routes/SiginUp.route")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use("/signup",SignUpRouter)

app.use("/login",LoginRoute)

const PORT = process.env.PORT || 8080

app.listen(8080, async ()=>{
    try{
        await connection
        console.log("Connected to DB successfully")
    }
    catch(err){
        console.log(err)
    }
    console.log(`Server running on PORT${PORT}`)
})