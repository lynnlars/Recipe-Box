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
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username} 
            name="username" 
            onChange={handleChange} 
            errmsg={errMsg}
            placeholder="Username"/>
          <input 
            type="password" 
            value={password} 
            name="password" 
            onChange={handleChange} 
            errmsg={errMsg}
            placeholder="Password"/>
          <button>{ btnText }</button>
          <p style = {{color: "red"}}>{errMsg}</p>
        </form>
      )
    }