<script setup lang="js">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { shoppingListResource } from '../../util/entityResource.js';
import router from '../../router.js';
import ShoppingListEntries from '../ShoppingListEntries/ShoppingListEntries.vue'
import ShoppingListEntryQuickCreate from '../ShoppingListEntries/ShoppingListEntryQuickCreate.vue'

const route = useRoute()

const shoppingList = ref({ name: "" });

onMounted(() => {
  if (!route.params.id) {

    // Generate a nice name (TODO: refactor into service at some point)
    const event = new Date();

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    shoppingList.value.name = event.toLocaleDateString(undefined, options);
  }
})

watch(() => route.params.id, fetchData, { immediate: true })

async function saveData() {
  let result = await shoppingListResource.save(shoppingList.value);
  // Stay in detail if route already has id, otherwise nav to id page
  //outer.push('/shopping-lists');
  if (!route.params.id) {
    router.push(`/shopping-lists/${result.id}`);
  }
}

function updateList(list) {
  console.log("updateList");
  shoppingList.value = list
  router.push(`/shopping-lists/${list.id}`);
}

async function fetchData(id) {
  console.log("ShoppingListDetail -> Fetch data");
  if (id) {
    shoppingList.value = await shoppingListResource.get(id);
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

  <form @submit.prevent="saveData">

    <div class="input-group mb-3">
      <input type="name" class="form-control" id="name" v-model="shoppingList.name" placeholder="Shopping List Name">
      <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i></button>
    </div>

  </form>

  Add:
  <ShoppingListEntryQuickCreate @entryModified="fetchData(route.params.id)" @listModified="updateList" :shoppingList="shoppingList"></ShoppingListEntryQuickCreate>
  <ShoppingListEntries @entryModified="fetchData(route.params.id)" :shoppingListEntries="shoppingList.entries"></ShoppingListEntries>

</template>

<style scoped>

</style>
