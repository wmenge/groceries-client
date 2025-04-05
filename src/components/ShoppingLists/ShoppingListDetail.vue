<script setup lang="js">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { shoppingListResource } from '../../util/entityResource.js';
import router from '../../router.js';
import ShoppingListEntries from '../ShoppingListEntries/ShoppingListEntries.vue'
import ShoppingListEntryQuickCreate from '../ShoppingListEntries/ShoppingListEntryQuickCreate.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n() 
const route = useRoute()
const shoppingList = ref({ name: "" });
const loading = ref(false);

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
  shoppingList.value = await shoppingListResource.save(shoppingList.value);
  // Stay in detail if route already has id, otherwise nav to id page
  //outer.push('/shopping-lists');
  /*if (!route.params.id) {
    router.push(`/shopping-lists/${result.id}`);
  }*/
}

// function updateList(list) {
//   console.log("updateList");
//   shoppingList.value = list
//   router.push(`/shopping-lists/${list.id}`);
// }

async function fetchData(id, spinner = true) {
  console.log("ShoppingListDetail -> Fetch data");
  if (id) {
    loading.value = true;
    
    try {
      shoppingList.value = await shoppingListResource.get(id);
    } catch (err) {
      //error.value = err.toString()
    } finally {
      loading.value = false;
    }
  }  

}

function handleListModified(list) {
  shoppingList.value = list;
}

function handleEntryAdded(entry) {
  shoppingList.value.entries.push(entry);
}

function handleEntryModified(entry) {
  //shoppingList.value.entries.push(entry);

  const indexToReplace = shoppingList.value.entries.findIndex((e) => e.id === entry.id);
  
  if (indexToReplace !== -1) {
    shoppingList.value.entries.splice(indexToReplace, 1, entry);
  }
}

function handleEntryDeleted(entry) {
  const indexToRemove = shoppingList.value.entries.findIndex((e) => e.id === entry.id);
  
  if (indexToRemove !== -1) {
    shoppingList.value.entries.splice(indexToRemove, 1);
  }
}

</script>

<template>

  <div class="wrapper container mt-3">

    <div v-if="loading" class="position-absolute start-50 mt-1 spinner-container">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="!loading">

      <form @submit.prevent="saveData">

        <div class="input-group mb-3">
          <input type="name" class="form-control" id="name" v-model="shoppingList.name" placeholder="Shopping List Name" autocapitalize="sentences" >
          <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i></button>
        </div>

      </form>

      {{ $t("titles.add") }}:
      <ShoppingListEntryQuickCreate @entryModified="handleEntryAdded" @listModified="handleListModified" :shoppingList="shoppingList"></ShoppingListEntryQuickCreate>
      <ShoppingListEntries @entryModified="handleEntryModified" @entryDeleted="handleEntryDeleted" :shoppingListEntries="shoppingList.entries"></ShoppingListEntries>

    </div>

  </div>

</template>

<style scoped>

.spinner-container {
  margin-left: -1em;
}


/* we will explain what these classes do next! */
/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
} */

</style>
