<script setup lang="js">
import { ref, onMounted } from 'vue'
import { groceryResource } from '../util/entityResource.js';

const groceriesList = ref(null)

onMounted(() => {
  fetchData();
})

async function fetchData() {
    try {
    groceriesList.value = await groceryResource.getAll();
  } catch (err) {
    //error.value = err.toString()
  } finally {
    //loading.value = false
  }
}

</script>

<template>
  <ul>
      <li v-for="grocery in groceriesList" :key="grocery.id">
        {{ grocery.name }}
      </li>
    </ul>
</template>

<style scoped>

</style>
