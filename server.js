const express = require('express')
const app = express()
const {expressjwt} = require('express-jwt')
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

app.use('/auth', require("./routes/authRouter"))
app.use('/api/main', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/main/recipes', require('./routes/recipeRouter'))
app.use('/api/main/comment', require('./routes/commentRouter'))

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
}

connectToDb()

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message}) 
})

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client", "dist", "index.html")))

//9Wll99ILAqzI57VU mongodb+srv://lynnlars20:9Wll99ILAqzI57VU@capstone.7h7tavn.mongodb.net/
app.listen(9000, () =>{
    console.log("server is running")
})