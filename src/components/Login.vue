<script setup lang="js">
  import.meta.env.VITE_API_URL
  const apiUrl = import.meta.env.VITE_API_URL
</script>

<template>

  Login with:
  <a :href="`${ apiUrl }/auth/github/redirect`">Github</a>

</template>

<style scoped>

</style>
