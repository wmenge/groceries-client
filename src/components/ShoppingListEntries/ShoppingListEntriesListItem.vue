<script setup lang="js">

import ShoppingListEntryDetail from '../ShoppingListEntries/ShoppingListEntryDetail.vue'
import { shoppingListEntriesResource } from '../../util/entityResource.js';
import * as bootstrap from 'bootstrap'
const emit = defineEmits(['entryModified'])
const props = defineProps(['shoppingListEntry']);

function handleEntryModified(entry) {
  var element = document.getElementById(`collapseExample${entry.id}`);
  var myCollapse = new bootstrap.Collapse(element);
  myCollapse.toggle();

  emit('entryModified', entry);
}

async function changeStatus() {
  // Update only status (use patch?)
  let saveShoppingListEntryDto = {
    id: props.shoppingListEntry.id,
    status: props.shoppingListEntry.status == 'open' ? 'closed' : 'open'
  };

  let result = await shoppingListEntriesResource.save(props.shoppingListEntry.shopping_list_id, saveShoppingListEntryDto);

  console.log(result);

  // Do this more: get definitive value from backend
  props.shoppingListEntry.status = result.status;
}

</script>

<template>

  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <span class="mb-1">
        <input class="form-check-input me-1" @change="changeStatus" type="checkbox" :checked="props.shoppingListEntry.status != 'open'" id="firstCheckbox">
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
      <ShoppingListEntryDetail @entryModified="handleEntryModified" :shoppingListEntry="props.shoppingListEntry"></ShoppingListEntryDetail>
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
