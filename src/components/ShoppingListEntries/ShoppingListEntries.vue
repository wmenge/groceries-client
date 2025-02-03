<script setup lang="js">

import ShoppingListEntriesListItem from '../ShoppingListEntries/ShoppingListEntriesListItem.vue'
const emit = defineEmits(['entryModified'])
const props = defineProps(['shoppingListEntries']);

function handleEntryModified(entry) {
  emit('entryModified', entry);
}

</script>

<template>
  <ul class="list-group">
    <ShoppingListEntriesListItem v-for="shoppingListEntry in props.shoppingListEntries" :key="shoppingListEntry.id" @entryModified="handleEntryModified" :shoppingListEntry="shoppingListEntry"></ShoppingListEntriesListItem>
  </ul>
</template>

<style scoped>

a {
  color: black;
  text-decoration: none;
}

input#quantity {
  flex: 0 0 3rem;
}
</style>
