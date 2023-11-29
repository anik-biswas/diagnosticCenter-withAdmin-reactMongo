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
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                const accessToken = localStorage.getItem('access-token');
              //console.log(accessToken)
                // const headers = {
                //   'Content-Type': 'application/json',
                // };
              
                // if (accessToken) {
                //   headers['Authorization'] = `Bearer ${accessToken}`;
                // }
              
                fetch('https://diagnostic-server-site.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('access-token')}`,
                    },
                    body: JSON.stringify(userInfo),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('access-token', data.token);
                        console.log(data);
                    }
                    });
              } else {
                localStorage.removeItem('access-token');
              } 
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