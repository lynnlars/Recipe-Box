import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentBox(props){
const {recipeId} = props
    

    const [hidden, setHidden] = useState(true)

    function toggleView(){
        setHidden(!hidden) //boolean to show or hide comments
    }

    return(
        <div>
            <CommentForm recipeId={recipeId}/>
            <button onClick = {toggleView}>{hidden ? 'show comments' : 'hide comments'}</button>
            {!hidden && <CommentList recipeId = {recipeId}/>}
        </div>
    )
}