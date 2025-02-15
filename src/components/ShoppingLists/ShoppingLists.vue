<script setup lang="js">
import { ref, onMounted } from 'vue'
import { shoppingListResource } from '../../util/entityResource.js';

const shoppingLists = ref(null)

onMounted(() => {
  fetchData();
})

async function fetchData() {
  console.log("fetch data!")
    try {
      shoppingLists.value = await shoppingListResource.getAll({ sort: '-created_at' });
  } catch (err) {
    console.log(err.toString());
  } finally {
    //loading.value = false
  }
}

function openEntryCount(shoppingList) {
  return shoppingList.entries.filter((e) => (e.status != 'open')).length;
}

function entryCount(shoppingList) {
  return shoppingList.entries.length;
}

function isClosed(shoppingList) {
  return entryCount(shoppingList) == openEntryCount(shoppingList);
}

</script>

<template>

  <div class="container mb-3">
    <RouterLink to="/shopping-lists/new" class="btn btn-outline-dark" type="button"><i class="bi bi-plus-lg"></i></RouterLink>
  </div>

  <ul class="list-group"> 
    <RouterLink class="list-group-item d-flex justify-content-between align-items-center" v-for="shoppingList in shoppingLists" :key="shoppingList.id" :to="`/shopping-lists/${shoppingList.id}`">
      <span v-bind:class="(isClosed(shoppingList)) ? 'closed' : ''">{{ shoppingList.name }}</span>
      <span class="badge bg-primary rounded-pill">
        {{ openEntryCount(shoppingList) }} / {{ entryCount(shoppingList) }}
      </span>
    </RouterLink>
  </ul>

</template>

<style scoped>

.closed {
  color: rgba(0, 0, 0, .25);
  text-decoration: line-through;
}

</style>
