<script setup lang="js">
  import { ref, watch, onMounted } from 'vue'
  import { shoppingListResource, shoppingListEntriesResource, openShoppingListEntries } from '../../../util/entityResource.js';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n() 

  const props = defineProps(['shoppingList']);
  const emit = defineEmits(['listModified'])

  const openEntries = ref([]);
  const selectedOpenEntries = ref([])

  const loading = ref(false);

  onMounted(() => {
      fetchOpenEntries();
  })

  async function fetchOpenEntries() {

    let localOpenEntries = await openShoppingListEntries.getAll();

    openEntries.value = localOpenEntries.map((entry) => {
      entry.selected = true;
      selectedOpenEntries.value.push(entry)
      return entry;
    });

  }

  async function moveOpenEntries() {

    loading.value = true;

    let shoppingList = null;

    // replace with a backend deep create of list + entry
    if (props.shoppingList.id) {
      shoppingList = props.shoppingList;
    } else {
      shoppingList = await shoppingListResource.save(props.shoppingList);
    }

    let saveShoppingListEntriesDto = selectedOpenEntries.value.map((entry) => {
      return {
        id: entry.id,
        quantity: entry.quantity,
        groceryName: entry.grocery.name,
        status: entry.status
      };
      //return entry;
    });

    let copiedEntries = await shoppingListEntriesResource.save(shoppingList.id, saveShoppingListEntriesDto);

    console.log(copiedEntries);

    shoppingList.entries = copiedEntries;

    emit('listModified', shoppingList);

    loading.value = false;

 }
  
</script>

<template>

    <p v-if="!openEntries?.length" class="text-center"><small class="text-secondary">{{ $t("messages.emptyShoppingList") }}</small></p>
    <p v-else-if="openEntries?.length > 0" class="text-center">
      <p class="text-center"><small class="text-secondary">{{ $t("messages.emptyShoppingListCopyEntries", { count: openEntries.length }) }}</small></p>
    
      <p><button type="button" @click="moveOpenEntries()" class="btn btn-primary">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i v-else-if="!loading" class="bi bi-copy"></i> {{ $t("buttons.moveEntries") }}
        
      </button></p>
    
      <TransitionGroup class="list-group" name="list" tag="ul">
        <a href="#" class="list-group-item list-group-item-action" aria-current="true" v-for="shoppingListEntry in openEntries" :key="shoppingListEntry.id">
          <div class="d-flex w-100 justify-content-between">
            <span class="mb-1">
              <input class="form-check-input me-1" type="checkbox" v-model="selectedOpenEntries" v-bind:value="shoppingListEntry" v-bind:id="`select-item-${shoppingListEntry.id}`" />
              <label class="form-check-label" v-bind:for="`select-item-${shoppingListEntry.id}`">&nbsp; 
                <span class="text-secondary">{{ shoppingListEntry.quantity }} x {{ shoppingListEntry.grocery.name }}</span> 
              </label>
            </span>
          </div>
        </a >
      </TransitionGroup>
    </p>

</template>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }

  /* input#quantity {
    flex: 0 0 3rem;
  } */

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
