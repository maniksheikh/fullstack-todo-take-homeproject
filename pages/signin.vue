<template>
  <div
    class="flex justify-center items-center min-h-[calc(100vh-70px)] overflow-hidden p-10"
  >
    <div
      class="mx-auto max-w-[375px-667px] min-h-[468px] shadow-lg bg-[#000] text-white rounded-[12px] p-9 gap-[56px]"
    >
      <div class="flex justify-center items-center text-lg font-bold mt-8 p-2 gap-[8px]">
        Todo App
      </div>
      <div class="text-center mt-4 text-[14px] font-[400] leading[22px]">
        <h3>Welcome to Todo</h3>
      </div>

      <button
        class="mx-auto w-[308px] h-[44px] flex justify-center items-center mt-12 border-solid border-[1px] cursor-pointer border-[#A37CFF] rounded-md"
        @click="signInWithGoogle"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_264_11372)">
            <path
              d="M24.4888 12.2242C24.4888 11.2409 24.4071 10.5234 24.2304 9.7793H12.7393V14.2173H19.4843C19.3484 15.3202 18.614 16.9811 16.9821 18.0972L16.9592 18.2458L20.5925 20.996L20.8442 21.0205C23.156 18.9344 24.4888 15.8649 24.4888 12.2242Z"
              fill="#4285F4"
            />
            <path
              d="M12.7393 23.9178C16.0438 23.9178 18.8179 22.8548 20.8442 21.0211L16.9821 18.0978C15.9486 18.8021 14.5615 19.2937 12.7393 19.2937C9.50273 19.2937 6.75576 17.2076 5.77654 14.3242L5.63301 14.3361L1.85507 17.193L1.80566 17.3271C3.81829 21.2337 7.95238 23.9178 12.7393 23.9178Z"
              fill="#34A853"
            />
            <path
              d="M5.77634 14.3248C5.51797 13.5807 5.36844 12.7834 5.36844 11.9596C5.36844 11.1357 5.51797 10.3385 5.76275 9.59439L5.75591 9.43592L1.93062 6.5332L1.80547 6.59137C0.975969 8.21247 0.5 10.0329 0.5 11.9596C0.5 13.8863 0.975969 15.7066 1.80547 17.3277L5.77634 14.3248Z"
              fill="#FBBC05"
            />
            <path
              d="M12.7393 4.62403C15.0374 4.62403 16.5877 5.59402 17.4717 6.40461L20.9258 3.10928C18.8044 1.1826 16.0438 0 12.7393 0C7.95238 0 3.81829 2.68406 1.80566 6.59056L5.76295 9.59359C6.75576 6.7102 9.50273 4.62403 12.7393 4.62403Z"
              fill="#EB4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_264_11372">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        <p class="ml-2 text-[16px] font-[500] leading[24px] gap-[14px]">
          Sign in with Google
        </p>
      </button>
      <div
        class="text-center w-[388px] mt-14 text-[14px] font-[500] leading[22px] px-[40px]"
      >
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply
      </div>
    </div>
  </div>
</template>

<script setup>
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
const route = useRoute();
const signInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    if (auth.currentUser.email) {
      navigateTo("/");
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
  return { signInWithGoogle };
};
</script>
  