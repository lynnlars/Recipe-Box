const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comments')

commentRouter.get("/", async(req,res,next) => {
    try {
        const foundComment = await Comment.find()
        return res.status(200).send(foundComment)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

commentRouter.post("/:recipeId", async(req,res,next) => {
    try {
        req.body.user = req.auth._id
        req.body.recipe = req.params.recipeId
        req.body.username = req.auth.username //show who made comment without making another request
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        return res.status(201).send(savedComment)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = commentRouter