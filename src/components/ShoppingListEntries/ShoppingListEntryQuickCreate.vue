<script setup lang="js">

import { ref, useTemplateRef } from 'vue'
import { shoppingListResource, shoppingListEntriesResource, groceryResource } from '../../util/entityResource.js';
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import { useI18n } from 'vue-i18n'

const { t } = useI18n() 
const emit = defineEmits(['entryModified', 'listModified'])
const props = defineProps(['shoppingList']);
const shoppingListEntry = ref({ quantity: 1, grocery: { name: "" } });
const loading = ref(false);

const autocompleteInput = useTemplateRef('autocompleteInput')

async function saveData() {

  loading.value = true;

  // bad hack 1: as we cant vmodel on the autocomplete control
  if (shoppingListEntry.value.grocery.name === "") {
    shoppingListEntry.value.grocery.name = autocompleteInput.value.value;
  }

  // cleanup
  let shoppingList = null;
  let shoppingListCreated = false;
  
  // replace with a backend deep create of list + entry
  if (props.shoppingList.id) {
    shoppingList = props.shoppingList;
  } else {
    shoppingList = await shoppingListResource.save(props.shoppingList);

    shoppingListCreated = true;
  }
    
  let saveShoppingListEntryDto = {
    quantity: shoppingListEntry.value.quantity,
    groceryName: shoppingListEntry.value.grocery.name,
    status: 'open',
  };

  let result = await shoppingListEntriesResource.save(shoppingList.id, saveShoppingListEntryDto);

  if (shoppingListCreated) {
     shoppingList.entries = [ result ];
     console.log(shoppingList);
     emit('listModified', shoppingList);
  } else {
     emit('entryModified', result);
  }
  
  shoppingListEntry.value.quantity = 1;
  shoppingListEntry.value.grocery.name = "";

  // bad hack 2: clear autocomplete control
  autocompleteInput.value.value = '';

  loading.value = false;
}

async function search(input) {
  if (!input) return [];
  var result = await groceryResource.getAll({ query: input, sort: 'name'});
  return result.map(g => g.name)
}

function handleSubmit(name) {
  // shoppingListEntry.value.grocery.name = name;
  // saveData();
}

</script>

<template>

  <form @submit.prevent="saveData">

    <div class="myflex mb-3">

      <div class="input-group">
        <button :disabled="shoppingListEntry.quantity < 2" @click="shoppingListEntry.quantity--" class="btn btn-outline-primary" type="button" id="button-addon1">-</button>
        <input type="name" class="form-control" id="quantity" v-model="shoppingListEntry.quantity" placeholder="Quantity">
        <button @click="shoppingListEntry.quantity++" class="btn btn-outline-primary" type="button" id="button-addon1">+</button>
      </div>

      <!-- todo: wrap autocomplete in custom component -->
      <autocomplete ref="autocompleteInput" class="ms-2 me-2" :search="search" @submit="handleSubmit"></autocomplete>

      <button type="submit" class="btn btn-primary">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i v-else-if="!loading" class="bi bi-cart"></i>
      </button>

    </div>

  </form>

</template>

<style>

/* Non scoped */
  .autocomplete-input {
    background-color: white;
    background-image: none;
    padding: .375rem .75rem;
  }

</style>

<style scoped>

.myflex {
  display: flex;
  flex-wrap: nowrap;
} 

.input-group {
  width: 8rem;
  flex-wrap: nowrap;
}

  input#quantity {
    /* flex: 0 0 3rem; */
    text-align: center;
  }


</style>
