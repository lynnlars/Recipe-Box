import React from "react";
import {Link} from 'react-router-dom'

export default function NavBar(props){
const {logout} = props

    return(
        <div className="navbar">
            <h1 className="nav-h1">Recipe</h1>
        <div>
        <Link to="/profile" className="link"><button>Profile</button></Link>
        <Link to="/public" className="link"><button>Public</button></Link>
        <Link to="/" className="link"><button onClick={logout}>Logout</button></Link>
        </div>
      </div>
    )
}