<template>
  <div class="text-center py-4 mt-4 font-medium">
    <button @click.stop="signInWithGoogle">Sign in With Google</button>
  </div>
</template>

<script setup>
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

const signInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    console.log("Successfully signed in with Google");
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};
</script>
  
  <style></style>
  