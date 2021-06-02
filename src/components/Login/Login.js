import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.Config';
import { UserContext } from '../../App';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    if(firebase.apps.length ===0){
        firebase.initializeApp(firebaseConfig);

    }
    const handleSignInWithGoogle=() =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const {displayName, email} = result.user;
                const signInUser = {name : displayName, email}
                setLoggedInUser(signInUser)

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                // ...
            });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleSignInWithGoogle}>Google Sign In</button>
        </div>
    );
};

export default Login;