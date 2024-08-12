import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import RecipesList from "./RecipesList";
import CommentList from "./CommentList";

//handle votes

export default function Public(){
    const {getAll, allPosts, getAllComments, allComments} = useContext(UserContext)

    useEffect(() => {
        getAll(),
        getAllComments()
    }, [])

    

    return(
        <div className="public main">
        <h1>All Recipes</h1>
        <RecipesList recipes={allPosts}/>
        </div>
    )
}