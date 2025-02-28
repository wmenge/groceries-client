<script setup lang="js">

import ShoppingListEntriesListItem from '../ShoppingListEntries/ShoppingListEntriesListItem.vue'
const emit = defineEmits(['entryModified'])
const props = defineProps(['shoppingListEntries']);

function handleEntryModified(entry) {
  emit('entryModified', entry);
}

</script>

<template>
  <TransitionGroup class="list-group" name="list" tag="ul">
    <!-- <ul> -->
      <ShoppingListEntriesListItem v-for="shoppingListEntry in props.shoppingListEntries" :key="shoppingListEntry.id" @entryModified="handleEntryModified" :shoppingListEntry="shoppingListEntry"></ShoppingListEntriesListItem>
    <!-- </ul> -->
  </TransitionGroup>
</template>

<style scoped>

a {
  color: black;
  text-decoration: none;
}

input#quantity {
  flex: 0 0 3rem;
}

/* animation */

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
