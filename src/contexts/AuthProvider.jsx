import React from 'react'
import { createContext,useState} from 'react'

export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
  let initialAuth={role:null,userName:null}
  let message="Hello From Context"
  const [auth,setAuth]=useState(initialAuth)
  const [msg,setMsg]=useState("Hello World")
  
  return (
    <AuthContext.Provider value={{auth,setAuth,message}} >
        {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider
