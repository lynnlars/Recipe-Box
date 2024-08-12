import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from "./context/UserProvider";
import Auth from "./components/Auth";
import Navbar from "./components/NavBar"
import Profile from "./components/Profile"
import Public from "./components/Public"
import RecipesForm from "./components/RecipesForm";
import Recipes from "./components/Recipes"

export default function App(){
  const {token, logout} = useContext(UserContext)

  return(
    <>
     {token && <Navbar logout = {logout}/>} 
      <div className="app">
        
        <Routes>
          <Route 
            path="/" 
            element={token ? <Navigate to = "/profile"/> : <Auth />}
          />
          <Route 
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/"/>}
          />
          <Route 
            path="/public"
            element={token ? <Public /> : <Navigate to="/"/>} //if token(?), go to public, if not(:) go to signup/login
          />
          <Route 
          path="/recipesform"
          element={token ? <RecipesForm/> : <Navigate to="/"/>}/>
          <Route
          path="/recipes"
          element={token ? <Recipes/> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
    </>
  )
}