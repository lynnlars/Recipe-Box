import React from "react";

export default function AuthForm(props){
    const {
        handleChange, 
        handleSubmit, 
        btnText, 
        errMsg,
        inputs: {
          username, 
          password
        } 
      } = props
      
      return (
        
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="text" 
            value={username} 
            name="username" 
            onChange={handleChange} 
            errmsg={errMsg}
            placeholder="Username"
            className="username"/>
          <input 
            type="password" 
            value={password} 
            name="password" 
            onChange={handleChange} 
            errmsg={errMsg}
            placeholder="Password"
            className="password"/>
          <button className="submit-bttn">{ btnText }</button>
          <p style = {{color: "red"}}>{errMsg}</p>
        </form>
        
      )
    }