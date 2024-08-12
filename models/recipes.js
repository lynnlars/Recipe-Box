const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipesSchema = new Schema ({ //schema blueprint/scematic
    recipeName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    ingredients: {
        type: String,
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username:{
        type: String,
        required: true
    },
    likedUser: [{
         type: Schema.Types.ObjectId,
         ref: "User"
    }],
    dislikedUser: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

})

module.exports = mongoose.model("Recipe", recipesSchema)