const express = require('express')
const authRouter = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

authRouter.post('/signup', async(req,res,next)=>{
    try {
        const existingUser = await User.findOne({username: req.body.username})
        if(existingUser){
            res.status(403)
            return next(new Error("this user already exists"))
        }
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)

        res.status(201).send({token, user: savedUser.withoutPassword()})
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

authRouter.post('/login', async(req,res,next)=>{
    try {
        const {username} = req.body
        const user = await User.findOne({username: username})
        if(!user){
            res.status(403)
            return next(new Error("username or password incorrect"))
        }

        const passwordCheck = await user.checkPassword(req.body.password)

        if(!passwordCheck){
            res.status(403)
            return next(new Error("user name or password incorrect"))
        }

        const token = jwt.sign(user.withoutPassword(), process.env.SECRET) //creating from user object. token carries values of user object without password

        res.status(201).send({token, user: user.withoutPassword()})
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = authRouter