<script setup lang="js">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { shoppingListResource } from '../../util/entityResource.js';
import { useI18n } from 'vue-i18n'

const { t } = useI18n() 
const loading = ref(true);
const route = useRoute()
const shoppingLists = ref(null)

watch(() => route.params.page, fetchData, { immediate: true })

watch(() => route.params.state, fetchData, { immediate: true })

async function fetchData() {

  if (route.path == "/" || route.path == "/shopping-lists") {
    route.params.state = 'active';
  }
  loading.value = true;
  try {
    var query = structuredClone(route.params);
    query.sort = '-created_at';
    shoppingLists.value = await shoppingListResource.getAll(query);
  } catch (err) {
    console.log(err.toString());
  } finally {
    loading.value = false
  }
}

function isClosed(shoppingList) {
  return shoppingList.totalEntryCount > 0 && shoppingList.totalEntryCount == shoppingList.closedEntriesCount;
}

</script>

<template>

  <div class="wrapper container mt-3">

      
    <ul class="nav nav-tabs d-flex mb-3">
      <li class="nav-item">
        <RouterLink class="nav-link" :class="{ active: route.params.state == 'active' }" :to="`/shopping-lists/state/active`">{{ $t("navigation.shoppingLists.active") }}</RouterLink>
      </li>
      <li class="nav-ite">
        <RouterLink class="nav-link" :class="{ active: route.params.state == 'closed' }" :to="`/shopping-lists/state/closed`">{{ $t("navigation.shoppingLists.closed") }}</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" :class="{ active: !route.params.state || route.params.state == 'all' }" :to="`/shopping-lists/state/all`">{{ $t("navigation.shoppingLists.all") }}</RouterLink>
      </li>

      <li class="nav-item ms-auto">
        <RouterLink to="/shopping-lists/new" class="btn" type="button"><i class="bi bi-plus-lg"></i> {{ $t("navigation.shoppingLists.new") }}</RouterLink>
      </li>
      <!-- </div> -->
    </ul>
  
    <div v-if="loading" class="position-absolute start-50 mt-1 spinner-container">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="!loading">

    <ul class="list-group mb-3"> 
      <RouterLink class="list-group-item d-flex justify-content-between align-items-center" v-for="shoppingList in shoppingLists.data" :key="shoppingList.id" :to="`/shopping-lists/${shoppingList.id}`">
        <span v-bind:class="(isClosed(shoppingList)) ? 'closed' : ''">{{ shoppingList.name }}</span>
        <span class="badge bg-primary rounded-pill">
          {{ shoppingList.closedEntriesCount }} / {{ shoppingList.totalEntryCount  }}
        </span>
      </RouterLink>
    </ul>
    
    <nav v-if="shoppingLists.last_page > 1" class="d-flex justify-content-center" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ active: ((!route.params.page && n == 1) || (n == route.params.page)) }" v-for="n in shoppingLists.last_page" :key="n">
          <RouterLink class="page-link" :to="`/shopping-lists/state/${route.params.state || 'all'}/pages/${n}`">{{n}}</RouterLink>
        </li>
      </ul>
    </nav>    

    </div>

  </div>
  
</template>

<style scoped>

.spinner-container {
  margin-left: -1em;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.closed {
  color: rgba(0, 0, 0, .25);
  text-decoration: line-through;
}

</style>
