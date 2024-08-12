import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";


export default function CommentForm(props){
const {addComment} = useContext(UserContext)
const {recipeId} = props
console.log(recipeId)

    const [formData, setFormData] = useState({text: ""})

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [name]: value
            }
        })

    }

    function handleSubmit(e){
        e.preventDefault()
        addComment(formData, recipeId)
        setFormData({text:" "})
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input 
            placeholder='Comment'
            name='text'
            value={formData.text}
            onChange={handleChange}
            />
            <button>Leave Comment</button>
        </form>
     )

}