const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",

    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: "Recipe"
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)