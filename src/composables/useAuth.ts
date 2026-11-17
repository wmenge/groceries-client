import type { User } from 'oidc-client-ts'
import { computed, shallowRef } from 'vue'
import { login, logout, userManager } from '@/auth/oidc'

/**
 * Unlike `useTasks`/`useTask`, these refs are **module scope, not per call**.
 * There is one session, and the navbar, the router guard and every API call all
 * have to see the same one — the case `useTasks.ts` anticipates when it says to
 * hoist and say so. `useLabels` is the only other composable that does it.
 */
// `shallowRef`, not `ref`: `User` is an opaque library class we only ever
// replace wholesale, so there is nothing to gain from proxying it deeply.
const user = shallowRef<User | null>(null)

userManager.events.addUserLoaded((loaded) => {
  user.value = loaded
})
userManager.events.addUserUnloaded(() => {
  user.value = null
})

/**
 * Resolves the stored session once, so `user` is populated before any view
 * renders. The router guard awaits this; `expired` is `undefined` when the
 * token carries no expiry, which counts as usable.
 */
export async function ensureUser(): Promise<boolean> {
  user.value = await userManager.getUser()
  return user.value !== null && !user.value.expired
}

export function useAuth() {
  const isAuthenticated = computed(() => user.value !== null && !user.value.expired)
  const username = computed(() => user.value?.profile.preferred_username ?? null)

  return { user, isAuthenticated, username, login, logout }
}
