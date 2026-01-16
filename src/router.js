import { createWebHistory, createRouter } from 'vue-router'

import GroceryList from './components/Groceries/GroceryList.vue'
import GroceryDetail from './components/Groceries/GroceryDetail.vue'
import ShoppingLists from './components/ShoppingLists/ShoppingLists.vue'
import ShoppingListDetail from './components/ShoppingLists/ShoppingListDetail.vue'
//import ShoppingListEntries from './components/ShoppingListEntries/ShoppingListEntries.vue'
import ShoppingListEntryDetail from './components/ShoppingListEntries/ShoppingListEntryDetail.vue'
import Login from './components/Login.vue'


const routes = [
  { path: '/', component: ShoppingLists },
  { path: '/login', component: Login },
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;