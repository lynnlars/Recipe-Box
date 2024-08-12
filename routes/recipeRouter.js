const express = require('express');
const recipeRouter = express.Router()
const Recipe = require('../models/recipes.js');
const { findByIdAndUpdate } = require('../models/users.js');

recipeRouter.get('/user', async(req,res,next) => { //getting all
    try {
        const foundRecipes = await Recipe.find({userId: req.auth._id})
        return res.status(200).send(foundRecipes)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

recipeRouter.get('/', async(req,res,next) => { //getting one
    try {
        const allRecipes = await Recipe.find() //finding everything
        return res.status(200).send(allRecipes)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

recipeRouter.post('/', async(req,res,next)=>{
    try {
        req.body.username = req.auth.username
        req.body.userId = req.auth._id
        const newRecipes = new Recipe(req.body)
        const savedRecipes = await newRecipes.save()
        return res.status(201).send(savedRecipes)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

recipeRouter.put('/:id', async(req,res,next)=>{
    try {
        updatedRecipes = await Recipe.findByIdAndUpdate(
           {_id: req.params.id, er: req.auth._id},
            req.body,
            { new: true }
        )
        return res.status(200).send(updatedRecipes)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

recipeRouter.delete('/:id', async(req,res,next) => {
    try {
        deletedRecipes = await Recipe.findByIdAndDelete({_id: req.params.id, er: req.auth._id})
        return res.status(200).send(deletedRecipes)
        
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

recipeRouter.put('/upvote/:id', async(req,res,next) => {
    try {
        const updatedVote = await Recipe.findOneAndUpdate(//search by any field (title, desc, etc) want to find one unique value 
            {_id: req.params.id},
            {
                $addToSet: {likedUser: req.auth._id}, //add to liked users array instead of push
                $pull: {dislikedUser: req.auth._id} //add to disliked users array. only pulls if exists 
                //can only be in one array at a time, cannot like and dislike
            },
            {new: true} //sends newest version of this back 
        )
        return res.status(201).send(updatedVote)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

recipeRouter.put('/downvote/:id', async(req,res,next) => { //goal is to get number
    try {
        const oneVote = await Recipe.findByIdAndUpdate(
            req.params.id, //id comes from line 84
            {
                $addToSet: {dislikedUser: req.auth._id},
                $pull: {likedUser: req.auth._id}
            },
            {new: true}
        )
        return res.status(201).send(oneVote)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


module.exports = recipeRouter