
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth, onAuthStateChanged } from "firebase/auth";
 import { useTodoStore } from "../store/todo";
// TODO: Add SDKs for Firebase products that you want to use

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAhGjCrYSSPdZHqr-ItGyZsLOG5uGCqe1U",
    authDomain: "my-todo-nuxt3-take-home.firebaseapp.com",
    projectId: "my-todo-nuxt3-take-home",
    storageBucket: "my-todo-nuxt3-take-home.appspot.com",
    messagingSenderId: "458177540549",
    appId: "1:458177540549:web:06de410ac226b519e8dbac",
    measurementId: "G-LG4Z6ZJPDY"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const store = useTodoStore();
  onAuthStateChanged(auth, (user) => {
    if(user) {
      console.log("user", user);
      store.setUser(user);
    } else {
      store.setUser(null)
    }
  });
})
