<template>
  <div>
    <div
      class="h-[70px] flex justify-between gap-1 items-center py-2 px-4 mx-auto max-w-[1300px] flex-col md:flex-row"
    >
      <div
        class="flex justify-between text-center items-center w-[800px] m-auto">
        <NuxtLink to="/" class="text-xl font-bold text-white-500">Todo-App</NuxtLink>
       <NuxtLink
          class="bg-[#55dda9] text-[#4d4c4c] px-4 py-1 text-base font-bold rounded-md"
          to="/signin" >
          Sign in</NuxtLink> 

        <div v-if="store.user">
          <div class="px-3">
            <h2 class="text-xl font-semibold text-[#333] opacity-90 mt-1.5">
              {{ store.user.name }}
            </h2>
            <h3 class="text-base text-[#000000] py-0.5 opacity-70">
              {{ cutEmailIntoAcceptableLength(store.user.email) }}
            </h3>
          </div>
          <NuxtLink
            to="/profile"
            class="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#DAECEF]"
          >
            <div
              class="flex justify-center items-center p-1 bg-[#863BF7] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                fill="#fff"
              >
                <path
                  d="M10 10q-1.25 0-2.125-.875T7 7q0-1.25.875-2.125T10 4q1.25 0 2.125.875T13 7q0 1.25-.875 2.125T10 10Zm-6 6v-2q0-.479.26-.906.261-.427.719-.719 1.146-.667 2.427-1.021Q8.688 11 10 11q1.312 0 2.594.354 1.281.354 2.427 1.021.458.271.719.708.26.438.26.917v2Zm1.5-1.5h9V14q0-.104-.062-.198-.063-.094-.167-.135-.959-.584-2.042-.875Q11.146 12.5 10 12.5q-1.146 0-2.229.292-1.083.291-2.042.875-.104.083-.167.156-.062.073-.062.177Zm4.5-6q.625 0 1.062-.438Q11.5 7.625 11.5 7t-.438-1.062Q10.625 5.5 10 5.5t-1.062.438Q8.5 6.375 8.5 7t.438 1.062Q9.375 8.5 10 8.5ZM10 7Zm0 7.5Z"
                />
              </svg>
            </div>

            <span class="text-lg text-[#127582]">Profile</span></NuxtLink
          >
          <button
            class="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#DAECEF] border-t mt-2 border-e-cyan-350"
            @click="logout"
          >
            <div
              class="flex justify-center items-center p-1 bg-[#863BF7] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="rounded-full"
                height="20"
                width="20"
                fill="#fff"
              >
                <path
                  d="M4.5 17q-.625 0-1.062-.438Q3 16.125 3 15.5v-11q0-.625.438-1.062Q3.875 3 4.5 3H10v1.5H4.5v11H10V17Zm9-3.5-1.062-1.062 1.687-1.688H8v-1.5h6.125l-1.687-1.688L13.5 6.5 17 10Z"
                />
              </svg>
            </div>
            <span class="text-lg text-[#127582]">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useTodoStore } from "../store/todo";
const store = useTodoStore();
const cutEmailIntoAcceptableLength = (email) => {
  return email.length > 20 ? email.substring(0, 20) + "..." : email;
};

import { signOut, getAuth } from "firebase/auth";
const auth = getAuth();
const logout = () => {
  signOut(auth)
    .then(() => {
      store.setUser(null);
      alert("logout page");
    })
    .catch((e) => {
      console.error(e);
    });
};
</script>
  