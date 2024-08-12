import React, {useState} from "react";
import axios from "axios";

export const UserContext = React.createContext()

const userAxios = axios.create() //carries token

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function userProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        recipes: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState) //user state
    const [allPosts, setAllPosts] = useState([]) //recipes state
    const [allComments, setAllComments] = useState([]) //commenst state

   

    async function signup (creds){
        try {
            const res = await axios.post("/auth/signup", creds)
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => {
                return{
                    ...prevUserState,
                    user: user,
                    token: token
                }
            })
            
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
       
    }

    async function login (creds){
        try {
            const res = await axios.post("/auth/login", creds)
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user)) 
            setUserState(prevUserState => {
                return{
                    ...prevUserState, 
                    user: user,
                    token: token
                }
            })
        } catch (error) {
            handleAuthErr(error.response.data.errMsg)
        }
    }

    async function logout(){
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setUserState(prevUserState => {
                return{
                    ...prevUserState,
                    user: {},
                    token: ''
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function handleAuthErr(errMsg){
        setUserState(prevUserState => {
            return{
                ...prevUserState,
                errMsg
            }
        })
    }

    function resetAuthErr(){
        setUserState(prevUserState => {
            return{
                ...prevUserState,
                errMsg: " "
            }
        })
    }

    async function addRecipe(newRecipe){
        try {
            const res = await userAxios.post("/api/main/recipes", newRecipe)
            setUserState(prevState =>{
                return{
                    ...prevState,
                    recipes: [...prevState.recipes, res.data]
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteRecipe(id){
        try {
            const res = await userAxios.delete(`/api/main/recipes/${id}`)
            setAllPosts(prevPosts => prevPosts.filter(recipe => recipe._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    async function getUserRecipes(){
        try {
            const res = await userAxios.get("/api/main/recipes/user")
            setUserState(prevState => {
                return{
                    ...prevState,
                    recipes: res.data
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function getAll(){
        try {
            const res = await userAxios.get('/api/main/recipes')
            setAllPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getAllComments(){
        try {
            const res = await userAxios.get('/api/main/comment')
            setAllComments(res.data) //add comments to array 
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function addComment(comment, id){
        try {
            const res = await userAxios.post(`/api/main/comment/${id}`,comment)
            setAllComments(prevAllComments => {
                return[
                    ...prevAllComments,
                     res.data
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function upvoteRecipe(recipeId){ //not technically updating body, don't need to pass object
        try {
            const res = await userAxios.put(`/api/main/recipes/upvote/${recipeId}`)
            console.log(res.data)
            setAllPosts(prevPosts => prevPosts.map(recipe => recipe._id === recipeId ? res.data : recipe)) //build new array 
            setUserState(prevUserState => {
                return{
                    ...prevUserState, //spread in prevuserstate
                    recipes: prevUserState.recipes.map(recipe => recipe._id === recipeId ? res.data : recipe)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function downvoteRecipe(recipeId){ //not technically updating body, don't need to pass object
        try {
            const res = await userAxios.put(`/api/main/recipes/downvote/${recipeId}`)
            console.log(res.data)
            setAllPosts(prevPosts => prevPosts.map(recipe => recipe._id === recipeId ? res.data : recipe)) //build new array 
            setUserState(prevUserState => {
                return{
                    ...prevUserState, //spread in prevuserstate
                    recipes: prevUserState.recipes.map(recipe => recipe._id === recipeId ? res.data : recipe)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <UserContext.Provider 
        value = {{ //pull out of context 
            ...userState,
            signup,
            login,
            logout,
            handleAuthErr,
            resetAuthErr,
            addRecipe,
            getUserRecipes,
            getAll,
            allPosts,
            getAllComments,
            allComments,
            addComment,
            upvoteRecipe,
            downvoteRecipe,
            deleteRecipe
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
