import { createWebHistory, createRouter } from 'vue-router'

import GroceryList from './components/Groceries/GroceryList.vue'
import GroceryDetail from './components/Groceries/GroceryDetail.vue'
import ShoppingLists from './components/ShoppingLists/ShoppingLists.vue'
import ShoppingListDetail from './components/ShoppingLists/ShoppingListDetail.vue'
//import ShoppingListEntries from './components/ShoppingListEntries/ShoppingListEntries.vue'
import ShoppingListEntryDetail from './components/ShoppingListEntries/ShoppingListEntryDetail.vue'
import CallbackView from './components/CallbackView.vue'

const routes = [
  { path: '/', component: ShoppingLists },
  { path: '/groceries', component: GroceryList },
  { path: '/groceries/new', component: GroceryDetail },
  { path: '/groceries/:id', component: GroceryDetail },
  { path: '/shopping-lists', component: ShoppingLists },
  { path: '/shopping-lists/pages/:page', component: ShoppingLists },
  { path: '/shopping-lists/state/:state', component: ShoppingLists },
  { path: '/shopping-lists/state/:state/pages/:page', component: ShoppingLists },
  { path: '/shopping-lists/new', component: ShoppingListDetail },
  { path: '/shopping-lists/:id', component: ShoppingListDetail },
  { path: '/shopping-lists/:shoppingListId/entries/new', component: ShoppingListEntryDetail },
  { path: '/shopping-lists/:shoppingListId/entries/:id', component: ShoppingListEntryDetail },
  {
    // The authorization server redirects here with the code. Registered on
    // the Keycloak `demo-client` as part of `http://localhost:5173/*`; any
    // replacement provider needs the same URL allowed.
    path: '/callback',
    name: 'callback',
    component: CallbackView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;