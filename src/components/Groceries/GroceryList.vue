<script setup lang="js">
import { ref, onMounted } from 'vue'
import { groceryResource } from '../../util/entityResource.js';

const groceriesList = ref(null)

onMounted(() => {
  console.log("GroceryList.onMounted")
  fetchData();
})

async function fetchData() {
    try {
    groceriesList.value = await groceryResource.getAll();
    console.log(groceriesList.value);
  } catch (err) {
    //error.value = err.toString()
  } finally {
    //loading.value = false
  }
}

</script>

<template>

  <div class="container mb-3">
    <RouterLink to="/groceries/new" class="btn btn-outline-dark" type="button"><i class="bi bi-plus-lg"></i></RouterLink>
  </div>

  <ul class="list-group"> 
    <RouterLink v-for="grocery in groceriesList" :key="grocery.id" class="list-group-item" :to="`/groceries/${grocery.id}`">{{ grocery.name }}</RouterLink>
  </ul>

</template>

<style scoped>

</style>
