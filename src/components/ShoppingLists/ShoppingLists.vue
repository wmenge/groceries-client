<script setup lang="js">
import { ref, onMounted } from 'vue'
import { shoppingListResource } from '../../util/entityResource.js';

const loading = ref(true);
const shoppingLists = ref(null)

onMounted(() => {
  fetchData();
})

async function fetchData() {
  console.log("fetch data!")
  loading.value = true;
  try {
      shoppingLists.value = await shoppingListResource.getAll({ sort: '-created_at' });
  } catch (err) {
    console.log(err.toString());
  } finally {
    loading.value = false
  }
}

function isClosed(shoppingList) {
  return shoppingList.totalEntryCount > 0 && shoppingList.totalEntryCount == shoppingList.closedEntriesCount;
}

</script>

<template>

  <div class="wrapper container mt-3">

    <div v-if="loading" class="position-absolute start-50 mt-1 spinner-container">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="!loading">

      <div class="container mb-3">
        <RouterLink to="/shopping-lists/new" class="btn btn-outline-dark" type="button"><i class="bi bi-plus-lg"></i></RouterLink>
      </div>

      <ul class="list-group"> 
        <RouterLink class="list-group-item d-flex justify-content-between align-items-center" v-for="shoppingList in shoppingLists" :key="shoppingList.id" :to="`/shopping-lists/${shoppingList.id}`">
          <span v-bind:class="(isClosed(shoppingList)) ? 'closed' : ''">{{ shoppingList.name }}</span>
          <span class="badge bg-primary rounded-pill">
            {{ shoppingList.closedEntriesCount }} / {{ shoppingList.totalEntryCount  }}
          </span>
        </RouterLink>
      </ul>
      
    </div>

  </div>
  
</template>

<style scoped>

.spinner-container {
  margin-left: -1em;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.closed {
  color: rgba(0, 0, 0, .25);
  text-decoration: line-through;
}

</style>
