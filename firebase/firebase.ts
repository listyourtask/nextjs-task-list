import {initializeApp} from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {collection,getFirestore,doc,setDoc,getDocs} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react'

export const firebaseConfig = {
  apiKey: "AIzaSyB2ZNFP1RlKdR8OKYh85H8XHBa1aq7evYU",
  authDomain: "todolist-auth-6c2b6.firebaseapp.com",
  projectId: "todolist-auth-6c2b6",
  storageBucket: "todolist-auth-6c2b6.appspot.com",
  messagingSenderId: "680641112529",
  appId: "1:680641112529:web:583d2cc295364cf21018f0",
  measurementId: "G-YC02Z9LM05"
};


export const app = initializeApp(firebaseConfig);

export const db = getFirestore()

const auth = getAuth()

export const initFirebase = () => {
  return app;
}

export const signUp = (email, password) =>{
  
  return createUserWithEmailAndPassword(auth,email,password)

}

export const login = (email, password) =>{
  
  return signInWithEmailAndPassword(auth,email,password)
  
}

export const useAuth = () =>{
  const[currentUser, setCurrentUser] = useState(null);

  useEffect(()  =>{

    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub

  }, [])
  return currentUser
}
