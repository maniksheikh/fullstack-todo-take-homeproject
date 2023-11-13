<template>
    <div class="bg-main">
      <navbar />
      <slot />
    </div>
  </template>
  
  <script lang="ts" setup></script>
  
  <style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }
  .bg-main {
    background: linear-gradient(
      180deg,
      #e6dbff 5.73%,
      #ebe3ff 21.35%,
      #f8f5ff 100%
    );
  }
  </style>
  