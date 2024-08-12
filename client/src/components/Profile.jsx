import React, {useContext, useEffect} from "react";
import {UserContext} from '../context/UserProvider'
import {Link} from 'react-router-dom'
import RecipesList from "./RecipesList";
import RecipesForm from "./RecipesForm";


export default function Profile(){
const {user, getUserRecipes, recipes, getAllComments} = useContext(UserContext)

useEffect(() => {
    getUserRecipes(),
    getAllComments() //attached to recipes
}, [])
    
return (
    <div className="profile main">
      <h1>Welcome {user.username}!</h1>
      <h3>Add A Recipe</h3>
      <RecipesForm/>
      <h3>Your Recipes</h3>
      <RecipesList recipes = {recipes}/>
    </div>
  )
}