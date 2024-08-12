import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

export default function RecipesForm(props) {
    const { addRecipe } = useContext(UserContext)

    const initInputs = {
        recipeName: "",
        description: "",
        ingredients: "",
        directions: ""
    }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs((prevInputs) => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        addRecipe(inputs)
        // console.log(inputs)
        setInputs(initInputs)
    }
    return (
        <form onSubmit={handleSubmit} className="recipe--form">
            <input
                placeholder="Recipe Name"
                type="text"
                name="recipeName"
                value={inputs.recipeName}
                onChange={handleChange} />
            <textarea
                placeholder="Description"
                type="text"
                name="description"
                value={inputs.description}
                onChange={handleChange} />
            <textarea
                placeholder="Ingredients"
                type="text"
                name="ingredients"
                value={inputs.ingredients}
                onChange={handleChange} />
            <textarea
                placeholder="Directions"
                type="text"
                name="directions"
                value={inputs.directions}
                onChange={handleChange} />
            <button className="submit--bttn">Submit Recipe</button>
        </form>
    )
}