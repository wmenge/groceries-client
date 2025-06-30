<script setup lang="js">
import { ref, onMounted } from 'vue'
import { groceryResource } from '../../util/entityResource.js';

const loading = ref(true);
const groceriesList = ref(null)

onMounted(() => {
  console.log("GroceryList.onMounted")
  fetchData();
})

async function fetchData() {
  try {
    loading.value = true;
    groceriesList.value = await groceryResource.getAll({ sort: 'name' });
    console.log(groceriesList.value);
  } catch (err) {
    //error.value = err.toString()
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="wrapper container mt-3">

    <div v-if="loading" class="position-absolute start-50 mt-1 spinner-container">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="!loading">

      <!-- <div class="container mb-3">
        <RouterLink to="/groceries/new" class="btn btn-outline-dark" type="button"><i class="bi bi-plus-lg"></i></RouterLink>
      </div> -->

      <ul class="list-group"> 
        <RouterLink v-for="grocery in groceriesList" :key="grocery.id" class="list-group-item d-flex justify-content-between align-items-center" :to="`/groceries/${grocery.id}`">
          {{ grocery.name }}
          <span class="badge bg-primary rounded-pill">
            {{ grocery.entriesCount }}
          </span>
      </RouterLink>
      </ul>

    </div>

  </div>

</template>

<style scoped>

</style>
