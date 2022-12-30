<template>
  <router-view />
</template>

<style>
* {
  scrollbar-width: auto;
  scrollbar-color: #878787 #ffffff;
}

*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: none;
}

*::-webkit-scrollbar-thumb {
  background-color: #878787;
  border-radius: 10px;
}

body::-webkit-scrollbar {
  width: 0;
}
</style>
