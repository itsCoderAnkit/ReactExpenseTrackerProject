import React, { useState } from 'react'

const AuthContext = React.createContext({
    token:'',
    email:'',
    isLoggedIn:false,
    login:(token,email)=>{},
    logout:()=>{}
})

export const AuthContextProvider = (props)=>{
    
    const initialToken = localStorage.getItem('token')
    const initialEmail = localStorage.getItem('email')
    const [token,setToken] = useState(initialToken)
    const [email,setEmail] = useState(initialEmail)

    const userIsLoggedIn = !!token
    const loginHandler =(token,email)=>{
        setToken(token)
        setEmail(email)
        
    }

    // const logoutHandler = ()=>{
    //     setToken(null)
    //     setEmail(null)
    // }

    const contextValue = {
        token:token,
        email:email,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        // logout:logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}

// export default AuthContext