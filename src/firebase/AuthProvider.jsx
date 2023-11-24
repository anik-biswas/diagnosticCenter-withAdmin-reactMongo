/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,getAuth, onAuthStateChanged,signInWithEmailAndPassword ,signOut,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import app from "./firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);
    const googleSignIn = (value) =>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    };

    const signUp =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }  

    const logout= () =>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
     const unSubscribe=   onAuthStateChanged(auth,currentUser =>{
            
            setUser(currentUser);
            setLoading(false);
           
        })
        return () => {
            unSubscribe();
        }
    },[])

    const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const AuthInfo = {
        user,
        googleSignIn,
        signUp,
        logout,
        signIn,
        loading
    };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;