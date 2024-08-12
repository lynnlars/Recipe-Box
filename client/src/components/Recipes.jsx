import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

//handle votes

export default function Recipes(props){
    const {recipeName, description, ingredients, directions, userId, username, _id, likedUser, dislikedUser } = props

    const {user, upvoteRecipe, downvoteRecipe, deleteRecipe} = useContext(UserContext)

    // console.log("userId:", userId)
    // console.log(user._id)

    let isUser = userId === user._id

    return(
        <div className="container">
            <div className="recipe--card">
                <h1>{username}</h1>
                <h1>Recipe: {recipeName}</h1>
                <h1>Description: {description}</h1>
                <h1>Ingredients: {ingredients}</h1>
                <h1>Directions: {directions}</h1>
            </div>
            <div>
                <p>Upvotes: {likedUser.length}</p>
                <button onClick={() => upvoteRecipe(_id)}>upvote</button>
            </div>
            <div>
                <p>Downvotes: {dislikedUser.length}</p>
                <button onClick={() => downvoteRecipe(_id)}>downvote</button>
            </div>
            <CommentBox recipeId = {_id}/> 
           
            {isUser && (
                <>
                <button onClick={() => deleteRecipe(_id)} className="dlt--bttn">Delete</button>
                <button>Edit</button>
                </>
            )}
        </div>
    )
}

//line 29 passing anonymous function so it doesnt run an infinite loopand call when the page is rendered 