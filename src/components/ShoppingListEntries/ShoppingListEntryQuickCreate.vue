<script setup lang="js">

import { ref, onMounted } from 'vue'
import { shoppingListResource, shoppingListEntriesResource } from '../../util/entityResource.js';
import Autocomplete from "bootstrap5-autocomplete";

const emit = defineEmits(['entryModified', 'listModified'])
const props = defineProps(['shoppingList']);
const shoppingListEntry = ref({ quantity: 1, grocery: { name: "" } });

onMounted(() => {

  Autocomplete.init("input.autocomplete", {
    server: 'http://localhost:8001/api/groceries',
    liveServer: true,
    valueField: 'name',
    labelField: 'name',
    fullWidth: true,
    updateOnSelect: true,
    autoselectFirst: false,
    preventBrowserAutocomplete: true,
    onSelectItem: updateName,
  });
})

// silly hack to make sure that name provided by autocomplete is set in model
function updateName(name) {
  console.log(name);
  shoppingListEntry.value.grocery.name = name.value;
}

async function saveData() {

  // cleanup
  let shoppingList = null;
  let shoppingListCreated = false;
  
  if (props.shoppingList.id) {
    shoppingList = props.shoppingList;
  } else {
    shoppingList = await shoppingListResource.save(props.shoppingList);
    shoppingListCreated = true;
  }
    
  let saveShoppingListEntryDto = {
    quantity: shoppingListEntry.value.quantity,
    groceryName: shoppingListEntry.value.grocery.name
  };

  let result = await shoppingListEntriesResource.save(shoppingList.id, saveShoppingListEntryDto);

  console.log(result);

  if (shoppingListCreated) {
    emit('listModified', shoppingList);
  } else {
    emit('entryModified', result);
  }
  
  shoppingListEntry.value.quantity = 1;
  shoppingListEntry.value.grocery.name = "";
}

</script>

<template>

  <form @submit.prevent="saveData">

    <div class="input-group mb-3">
      <button :disabled="shoppingListEntry.quantity < 2" @click="shoppingListEntry.quantity--" class="btn btn-outline-primary" type="button" id="button-addon1">-</button>
      <input type="name" class="form-control" id="quantity" v-model="shoppingListEntry.quantity" placeholder="Quantity">
      <button @click="shoppingListEntry.quantity++" class="btn btn-outline-primary" type="button" id="button-addon1">+</button>
      <input type="name" class="form-control autocomplete" id="groceryName" v-model="shoppingListEntry.grocery.name" placeholder="Grocery">
      <button type="submit" class="btn btn-primary"><i class="bi bi-cart"></i></button>
    </div>

  </form>

</template>

<style scoped>

  input#quantity {
    flex: 0 0 3rem;
    text-align: center;
  }

</style>
