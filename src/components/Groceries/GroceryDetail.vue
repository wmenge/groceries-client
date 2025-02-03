<script setup lang="js">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { groceryResource } from '../../util/entityResource.js';
import router from '../../router.js';

const route = useRoute()

const grocery = ref({ name: "" });

watch(() => route.params.id, fetchData, { immediate: true })

async function saveData() {
  console.log("saveData");
  await groceryResource.save(grocery.value);
  // Optionally, navigate to the list view
  router.push('/groceries');

  // dalert(grocery.value.name);
}

async function deleteData() {
  console.log("deleteData");
  await groceryResource.remove(grocery.value);
  router.push('/groceries');
}

async function fetchData(id) {
  if (id) {
    console.log("fetchData of detail!" + id);
    grocery.value = await groceryResource.get(id);
    /*  try {
      groceriesList.value = await groceryResource.getAll();
    } catch (err) {
      //error.value = err.toString()
    } finally {
      //loading.value = false
    }*/
  }  
}

</script>

<template>

  <h1>Grocery Detail</h1>

  <form @submit.prevent="saveData">
  
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Name</label>
      <input type="name" class="form-control" id="name" v-model="grocery.name" placeholder="Grocery Name">
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <button v-if="grocery.id" type="button" @click="deleteData()" class="btn btn-danger">Delete</button>
  
  </form>

</template>

<style scoped>

</style>
