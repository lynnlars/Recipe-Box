import React, {useContext} from "react";
import { UserContext } from "../context/UserProvider";

export default function CommentList(props){
    const {recipeId} = props
    const {allComments} = useContext(UserContext)
 //console.log(allComments)

    const filteredComment = allComments.filter(comment => comment.recipe === recipeId) //ref to recipe comment was made on 
    console.log(filteredComment)
    const commentElement = filteredComment.map(comment => {
        return(
            <>
            <p>{comment.username}</p>
            <p>{comment.text}</p>
            </>
        )
    })

    // console.log(allComments)
    // console.log(recipeId)

   return(
    <>
    {commentElement}
    </>
   )
}