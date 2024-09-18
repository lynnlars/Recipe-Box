import React, {useState, useContext} from "react"
import AuthForm from "./AuthForm.jsx"
import { UserContext } from "../context/UserProvider.jsx"

const initInputs = {username: "", password: ""}

export default function Auth(props){
const [inputs, setInputs] = useState(initInputs)
const [toggle, setToggle] = useState(false)

const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)

function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
        ...prevInputs, 
        [name]: value
    }))
}

function handleSignup(e){
    e.preventDefault()
    signup(inputs)
}

function handleLogin(e){
    e.preventDefault()
    login(inputs)
}

return (
    <div className="auth-container">
      <h1 className="title">Recipe Box</h1>
      <hr/>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            errMsg={errMsg}
            btnText="Sign up"
          />
          <p onClick={() => setToggle(prev => !prev)} className="member">Already a member?</p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            errMsg={errMsg}
            btnText="Login"
          />
          <p onClick={() => setToggle(prev => !prev)} className="member">Not a member?</p>
        </>
      }
    </div>
  )
}