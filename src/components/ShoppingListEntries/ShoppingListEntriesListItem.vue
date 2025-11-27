<script setup lang="js">

import { ref } from 'vue'
import ShoppingListEntryDetail from '../ShoppingListEntries/ShoppingListEntryDetail.vue'
import { shoppingListEntriesResource } from '../../util/entityResource.js';
import * as bootstrap from 'bootstrap'
const emit = defineEmits(['entryModified', 'entryDeleted'])
const props = defineProps(['shoppingListEntry']);
const loading = ref(false);

function handleEntryModified(entry) {
  var element = document.getElementById(`collapseExample${entry.id}`);
  var myCollapse = new bootstrap.Collapse(element);
  myCollapse.toggle();

  emit('entryModified', entry);
}

function handleEntryDeleted(entry) {
  emit('entryDeleted', entry);
}

async function changeStatus() {
  // Update only status (use patch?)

  loading.value = true;

  let saveShoppingListEntryDto = {
    id: props.shoppingListEntry.id,
    groceryName: props.shoppingListEntry.grocery.name, // not needed to give full object if we use a patch
    quantity: props.shoppingListEntry.quantity, // not needed to give full object if we use a patch
    status: props.shoppingListEntry.status == 'open' ? 'closed' : 'open'
  };

  let result = await shoppingListEntriesResource.save(props.shoppingListEntry.shopping_list_id, saveShoppingListEntryDto);

  console.log(result);

  loading.value = false;

  // Do this more: get definitive value from backend
  props.shoppingListEntry.status = result.status;
}

</script>

<template>
  

  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <span class="mb-1">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <input v-else-if="!loading" class="form-check-input me-1" @change="changeStatus" type="checkbox" :checked="props.shoppingListEntry.status != 'open'" id="firstCheckbox">
      <label class="form-check-label" for="firstCheckbox">&nbsp;
        <a v-bind:class = "(props.shoppingListEntry.status != 'open')?'closed':''" @click="changeStatus" :href="`#collapseExample${shoppingListEntry.id}`" role="button" aria-expanded="false" aria-controls="collapseExample">
          {{ props.shoppingListEntry.quantity }} x {{ props.shoppingListEntry.grocery.name }}
        </a>
      </label>
    </span>
      <button class="btn btn-outline-secondary btn-xsm" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapseExample${props.shoppingListEntry.id}`" aria-expanded="false" aria-controls="collapseExample">
        ...
      </button>
    </div>
    <div class="collapse" :id="`collapseExample${props.shoppingListEntry.id}`">
      <hr/>
      <ShoppingListEntryDetail @entryModified="handleEntryModified" @entryDeleted="handleEntryDeleted" :shoppingListEntry="props.shoppingListEntry"></ShoppingListEntryDetail>
    </div>
  
  </a>
</template>

<style scoped>

.btn-xsm {
  --bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;
}

.closed {
  color: rgba(0, 0, 0, .25);
  text-decoration: line-through;
}

a {
  color: black;
  text-decoration: none;
}

input#quantity {
  flex: 0 0 3rem;
}
</style>
