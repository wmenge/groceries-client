<script setup lang="js">

import { ref, onMounted } from 'vue'
import { shoppingListEntriesResource, groceryResource } from '../../util/entityResource.js';
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

const emit = defineEmits(['entryModified'])
const props = defineProps(['shoppingList', 'shoppingListEntry']);
const shoppingListEntry = ref({ quantity: 1, grocery: { name: "" } });

onMounted(() => {

  if (props.shoppingListEntry) {
    shoppingListEntry.value = props.shoppingListEntry; 
  }

})

async function saveData() {

  // bad hack as we cant vmodel on the autocomplete control
  if (shoppingListEntry.value.grocery.name === "") {
    shoppingListEntry.value.grocery.name = document.getElementsByClassName('autocomplete-input')[0].value;
  }

  let saveShoppingListEntryDto = {
    id: shoppingListEntry.value.id,
    quantity: shoppingListEntry.value.quantity,
    groceryName: shoppingListEntry.value.grocery.name
  };

  let result = await shoppingListEntriesResource.save(shoppingListEntry.value.shopping_list_id, saveShoppingListEntryDto);

  emit('entryModified', result);
}

async function deleteData() {
  await shoppingListEntriesResource.remove(shoppingListEntry.value.shopping_list_id, shoppingListEntry.value);
  emit('entryModified', shoppingListEntry.value);
}

async function search(input) {
  if (!input) return [];
  var result = await groceryResource.getAll({ query: input, sort: 'name'});
  return result.map(g => g.name)
}

function handleSubmit(name) {
  console.log(name);
  shoppingListEntry.value.grocery.name = name;
}

</script>

<template>

  <form @submit.prevent="saveData">

    <div class="row">

      <div class="col">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Quantity</label>
          <div class="input-group mb-3">
            <button :disabled="shoppingListEntry.quantity < 2" @click="shoppingListEntry.quantity--" class="btn btn-outline-primary" type="button" id="button-addon1">-</button>
            <input type="name" class="form-control" id="quantity" v-model="shoppingListEntry.quantity" placeholder="Quantity">
            <button @click="shoppingListEntry.quantity++" class="btn btn-outline-primary" type="button" id="button-addon1">+</button>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Grocery</label>
          <!-- <input type="name" class="form-control autocomplete" id="groceryName" v-bind:value="shoppingListEntry.grocery.name" placeholder="Grocery"> -->
           <!-- todo: wrap autocomplete in custom component -->
          <autocomplete :search="search" @submit="handleSubmit" v-bind:defaultValue="shoppingListEntry.grocery.name"></autocomplete>

        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end">

      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> Save</button>
        <button v-if="shoppingListEntry.id" type="button" @click="deleteData()" class="btn btn-danger"><i class="bi bi-trash"></i> Remove</button>
      </div>
    </div>

  </form>

</template>

<style scoped>

input#quantity {
  flex: 0 0 3rem;
  text-align: center;
}

input#quantity {
  flex: 0 0 3rem;
}

</style>
