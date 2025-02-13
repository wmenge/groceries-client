<script setup lang="js">
  import.meta.env.VITE_API_URL
  const apiUrl = import.meta.env.VITE_API_URL
</script>

<template>

<div class="jumbotron">
  <h1 class="display-6">Please log in...</h1>
  <hr class="my-4">
  <p class="lead">
    
    <a class="btn btn-primary btn-lg" :href="`${ apiUrl }/auth/google/redirect`">Google</a> &nbsp;
    <a class="btn btn-secondary btn-lg" :href="`${ apiUrl }/auth/github/redirect`">Github</a>
    
  </p>
</div>

</template>

<style scoped>

.jumbotron {
  padding: 4rem 2rem;
  background-color: #eeeeee;
  border-radius: .5rem;
}


</style>
