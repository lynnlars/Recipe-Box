import React from "react";
import Recipes from "./Recipes";

export default function RecipesList(props){
    const {recipes} = props 

    const recipesElements = recipes.map(recipe => { //mapping through recipes 
        return(
            <Recipes {...recipe} key={recipe._id}/> //spreading in all information 
    )
    })
    return(
        <div className="recipe-list">
        {recipesElements}
        </div>
    )
}